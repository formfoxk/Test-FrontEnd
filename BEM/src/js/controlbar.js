/**
 * @description 파일 확장자에 맞는 컨트롤바를 생성해 로드
 * @param {any} ext 파일 확장자
 */
var controlbarLoad = function(ext) {
    console.log(ext);
    switch(ext) {
        case 'xls':
            sheetControlbarLoad();
        break;
        default:
            pageControlbarLoad();
        break;
    }
}

/**
 * @description 시트 기반 컨트롤바 로드
 */
var sheetControlbarLoad = function() {
    createSheetControlbar();
    bindSheetControlbar();
}

/**
 * @description 페이지 기반 컨트롤바 로드
 */
var pageControlbarLoad = function() {
    createPageControlbar();
    bindPageControlbar();
}

/**
 * @description 시트 기반 컨트롤바 생성
 */
var createSheetControlbar = function() {
    // create button
    appendControlbarButton('page-first', '../images/icon_page_first.png');
    appendControlbarButton('page-prev', '../images/icon_page_left.png');
    appendControlbarButton('page-next', '../images/icon_page_right.png');
    appendControlbarButton('page-end', '../images/icon_page_end.png');
    appendControlbarSeperator()
    appendControlbarButton('page-zoomout', '../images/icon_page_zoomout.png');
    appendControlbarButton('page-zoomin', '../images/icon_page_zoomin.png');

    // add class
    var className = 'controlbar__block--seperator';
    $('#page-first').addClass(className);
    $('#page-prev').addClass(className);
    $('#page-next').addClass(className);
    $('#page-zoomout').addClass(className);
}

/**
 * @description 페이지 기반 컨트롤바 생성
 */
var createPageControlbar = function() {
    // create button
    appendControlbarButton('page-prev', '../images/icon_page_left.png');
    appendControlbarButton('page-next', '../images/icon_page_right.png');
    appendControlbarSeperator();
    appendControlbarButton('page-zoomout', '../images/icon_page_zoomout.png');
    appendControlbarButton('page-zoomin', '../images/icon_page_zoomin.png');
    appendControlbarSeperator()
    appendControlbarButton('page-screenfit', '../images/icon_page_screenfit.png');
    appendControlbarButton('page-docfit', '../images/icon_page_docfit.png');

    // add class
    var className = 'controlbar__block--seperator';
    $('#page-prev').addClass(className);
    $('#page-zoomout').addClass(className);
    $('#page-screenfit').addClass(className);
}

/**
 * @description 컨트롤바 버튼 추가
 * @param {any} btnId 컨트롤바 버튼의 id
 * @param {any} btnImgPath 컨트롤바 버튼 이미지 경로
 */
var appendControlbarButton = function(btnId, btnImgPath) {
    $('#controlbar').append($('<div/>', {
        id: btnId,
        class: 'controlbar__block',
    }));
    $('#'.concat(btnId)).append($('<img/>', {
        class: 'controlbar__img',
        alt: 'page-prev',
        src: btnImgPath
    }));
}

/**
 * @description 컨트롤바 버튼 구분자 추가
 */
var appendControlbarSeperator = function() {
    $('#controlbar').append($('<div/>', {
        class: 'controlbar__seperator',
    }));
}

/**
 * @description 시트 기반 컨트롤바 이벤트 바인드
 */
var bindSheetControlbar = function() {
    
}

/**
 * @description 페이지 기반 컨트롤바 이벤트 바인드
 */
var pageControlbarLoad = function() {
    
}

module.exports.controlbarLoad = controlbarLoad;
