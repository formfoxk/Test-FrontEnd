var curDirRelativePath;
var filePathMap;

$(function () {
    renewFileExplorer('');
    addSubmitButtonEvent();
    addContextMenuEvent();
})

function renewFileExplorer(path) {
    var prevDirPathMap = new Object();
    var dirPathMap = new Object();
    filePathMap = new Object();

    var addClickPervDirEvent = function () {
        $(".prev-dir-name").click(function () {
            var prevDirName = $(".prev-dir-name").html();
            if (!isRootDir(prevDirName)) {
                var prevDirPath = prevDirPathMap[prevDirName];
                removeFileExplorer();
                renewFileExplorer(prevDirPath);
            }
        });
    }

    var addClickDirNameEvent = function(){
        $(".dir-name").click(function () {
            var dirName = $(this).html();
            var dirPath = dirPathMap[dirName];
            removeFileExplorer();
            renewFileExplorer(dirPath);
        });
    } ;

    $.post("/"
        , { path : path }
        , function (jsonResponse) {
            curDirRelativePath = path;
            var curDirPath = jsonResponse[0].curDirPath;
            $(".cur-dir-path").append("Path > " + curDirPath);

            var html = "<div class=\"div-table-heading\">"
                    + "<div class=\"div-table-row\">"
                    + "<div class=\"div-table-head col1\">이름</div>"
                    + "<div class=\"div-table-head col2\">생성 일자</div>"
                    + "<div class=\"div-table-head col3\">크기</div>"
                    + "</div></div>";

            html += "<div class=\"div-table-body\">";

            var prevDirName = jsonResponse[1].name;
            var prevDirPath = jsonResponse[1].path;
            prevDirPathMap[prevDirName] = prevDirPath;
            html += "<div class=\"div-table-row\">";
            html += "<div class=\"div-table-cell col1 hover prev-dir-name\">" + prevDirName + "</div>"
                    + "<div class=\"div-table-cell col2\"></div>"
                    + "<div class=\"div-table-cell col3\"></div>";
            html += "</div>";

            for (var i = 0; i <jsonResponse[2].length; i++) {
                var dirName = jsonResponse[2][i].name;
                var dirRelativePath = jsonResponse[2][i].path;
                var dirModifiedDate = jsonResponse[2][i].modifiedDate;
                html += "<div class=\"div-table-row\">";
                html += "<div class=\"div-table-cell col1 hover dir-name\">" + dirName + "</div>"
                    + "<div class=\"div-table-cell col2\">" + dirModifiedDate + "</div>"
                    + "<div class=\"div-table-cell col3\">" + "-" + "</div>";
                html += "</div>";
                dirPathMap[dirName] = dirRelativePath;
            }

            for (var i = 0; i <jsonResponse[3].length; i++) {
                var fileName = jsonResponse[3][i].name;
                var fileRelativePath = jsonResponse[3][i].path;
                var fileModifiedDate = jsonResponse[3][i].modifiedDate;
                var fileSize = jsonResponse[3][i].size;
                html += "<div class=\"div-table-row\">";
                html += "<div class=\"div-table-cell col1 hover context-menu\">" + fileName + "</div>"
                    + "<div class=\"div-table-cell col2\">" + fileModifiedDate + "</div>"
                    + "<div class=\"div-table-cell col3\">" + fileSize + "</div>";
                filePathMap[fileName] = fileRelativePath;
                html += "</div>";
            }

            html += "</div>";
            $(".files").append(html);
        }, 'json')
        .done(function (jsonResponse) {
            console.log(jsonResponse);

            addClickPervDirEvent();
            addClickDirNameEvent();
        })
        .fail(function (jsonResponse) {
            console.warn(jsonResponse)
        })


}

function addSubmitButtonEvent() {
    $('#upload-submit').click(function(event) {
        event.preventDefault();

        if (($("#upload-file").val() == "" || $("#upload-file").val() == null)) {
            alert("업로드할 파일을 선택해주세요");
        } else {
            var form = $('#upload-form')[0];
            var formData = new FormData(form);
            formData.append("path", curDirRelativePath);
            $("#upload-submit").prop("disabled", true);

            $.ajax({
                url: "/uploadFile.do",
                enctype: "multipart/form-data",
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                dataType: 'json',
                success: function (jsonResponse) {
                    if (Boolean(jsonResponse.result.isSuccess) === true) {
                        alert("파일 업로드를 성공했습니다. ")
                    } else {
                        var message = jsonResponse.result.message;
                        alert(message);
                    }
                    removeFileExplorer();
                    renewFileExplorer(curDirRelativePath);
                    $("#upload-submit").prop("disabled", false);
                },
                error: function () { //jqXHR
                    alert("파일 업로드를 실패했습니다.")
                    $("#upload-submit").prop("disabled", false);
                    window.open("/errorPage", "_self");
                }
            })
        }
    });
}

function addContextMenuEvent() {
    $.contextMenu ({
        selector: '.context-menu',
        trigger: 'left',
        build: function ($triggerElement) {
            var conditionName;
            var fileName = $triggerElement[0].textContent;
            var fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
            if (isWordExt(fileExt)) {
                conditionName = "워드로 열기";
            }else if (isSlideExt(fileExt)) {
                conditionName = "슬라이드로 열기";
            }else if (isCellExt(fileExt)) {
                conditionName = "셀로 열기";
            }
            return {
                callback: function (key) {
                    var requestUrl = key + filePathMap[fileName];
                    window.open(requestUrl,'_blank');
                },
                items: {
                    "/imgDocView.do/?path=" : {name: "이미지 바로가기"},
                    "/htmlDocView.do/?path=" : {name: "HTML 바로보기"},
                    "/importDoc.do/?path=" : {
                        name: conditionName,
                        visible: function () {
                            if (isWordExt(fileExt)
                                || isSlideExt(fileExt)
                                || isCellExt(fileExt)) {
                                return true;
                            }
                            return false;
                        }
                    },
                    "/downloadFile.do/?path=" : {
                        name: "다운로드",
                        callback: function (key) {
                            var requestUrl = key + filePathMap[fileName];
                            window.open(requestUrl,'_self');
                        }
                    }
                }
            }
        }
    });
}

function removeFileExplorer() {
    $(".cur-dir-path").empty();
    $(".files *").remove();
}

function isRootDir(name) {
    if (name == "*ROOT")
        return true;
    return false;
}

function isWordExt(fileExt) {
    if (fileExt === "TXT"
        || fileExt === "NDOC"
        || fileExt === "DOC"
        || fileExt === "DOCX"
        || fileExt === "HWP") {
        return true;
    }
    return false;
}

function isSlideExt(fileExt) {
    if (fileExt === "NPPT"
        || fileExt === "PPT"
        || fileExt === "PPTX") {
        return true;
    }
    return false;
}

function isCellExt(fileExt) {
    if (fileExt === "NXLS"
        || fileExt === "XLS"
        || fileExt === "XLSX") {
        return true;
    }
    return false;
}