$(function () { // jQB //////////////////////////////
console.log("로딩완료!");


// 헤더 스크롤 내릴때 변경 /////////////////////
$(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop == 0) {
        $('header').removeClass('header_change');
        $('.ham span').css({
            background:"#fff"
        });
    } else {
        $('header').addClass('header_change');
       $('.ham span').css({
            background:"#333"
        });
    }
});

    
// 메뉴 클릭시 메뉴창 나오기 //////////////////////
    $(".ham").click(function(){
        $(".menu_popup_wrap").animate({
            right:0
        },300);
    });

    // 메뉴창 닫기버튼 클릭시 메뉴창 닫기 ////////////
    $(".menu_popup_cbtn_img").click(function(a){
        a.preventDefault();
        $(".menu_popup_wrap").animate({
            right:"-35%"
        },300);
    });







// 배너영역 /////////////////////////////////////
// 배너이미지 이동 대상: 배너박스(.slide)
var tg = $(".slide");


/* ///////////////////////////////////////////
함수명: goSlide
기능: 슬라이드 방향별 이동
*/ ///////////////////////////////////////////

// 광클금지 변수
var sprot = 0; //0-허용, 1-금지
// 슬라이드 순번 변수
var sno = 0;
// 슬라이드 개수 변수
var scnt = tg.find("li").length;
console.log("슬라이드개수:" + scnt);
/////////////////////////////////

var goSlide = function (dir) {

    console.log("광클금지상태:" + sprot);

    /// 광클 금지 설정 ///////////////////
    if (sprot === 1) return false;
    sprot = 1; // 잠금
    setTimeout(function () {
        sprot = 0; //0.8초 후 해제!(CSS 트랜지션 시간과 맞추기)
    }, 800); ///// 타임아웃 ///////////
    ////////////////////////////////////


    //dir-방향(0-왼쪽, 1-오른쪽)
    console.log("이동방향:" + dir);

    // 오른쪽 전달값이 1이므로 true
    if (dir) {
        $(".slide").animate({
            left: "-100%"
        }, 800, function () {
            $(this).append($(">li", this).first())
                .css({
                    left: "0"
                });
        });
        //슬라이드 순번증가
        sno++;
        if (sno === scnt) sno = 0; //한계수(처음으로)

    } // if ///////////////////

    // 왼쪽 전달값이 0이므로 false (else로 처리!)
    else {
        $(".slide").prepend($(".slide>li").last()).css({
            left: "-100%"
        });
        $(".slide").delay(100).animate({
            left: "0"
        }, 800);

        // 슬라이드 개수 감소
        sno--;
        if (sno === -1) sno = scnt - 1; // 한계수(마지막 번호로)

    } // else//////////////////
    // 블릿으로 이동 /////////
    // 해당순번 li에 class="active" 지정하기
    $(".bullet > ul > li").eq(sno).addClass("active")
        .siblings().removeClass("active");




}; //////////////// goSlide함수 /////////////////////
////////////////////////////////////////////////////


/* ///////////////////////////////////////////
    함수명: autoCall
    기능: 자동호출 기능
*/ ///////////////////////////////////////////
var autoI; //인터발용 변수
var autoCall = function () {
    // console.log("자동넘김!");

    // 4초간격으로 슬라이드함수 호출
    autoI = setInterval(function () {
        goSlide(1);
    }, 4000); /////// 인터발함수 /////////        

}; //////////////// autoCall 함수 /////////////////////
//////////////////////////////////////////////////////

/* ///////////////////////////////////////////
    함수명: clearAuto
    기능: 자동넘김 지우기
*/ ///////////////////////////////////////////
var autoT; //타임아웃용 변수
var clearAuto = function () {
    //console.log("자동지워!");

    // 인터발 지우기
    clearInterval(autoI);
    // 타임아웃지우기(실행쓰나미 방지)
    clearTimeout(autoT);

    //재실행 호출 세팅(3초 후 한번실행 세팅)
    autoT = setTimeout(autoCall, 3000);

}; //////////////// clearAuto 함수 /////////////////////
/////////////////////////////////////////////////////



//// 자동넘김함수 호출!
autoCall();
chgbtn();



/// 블릿 클릭시 /////////////////
$(".bullet > ul > li").click(function () {
    var idx = $(this).index();
    goSlide(idx, 2);
    // 뒤 전달값은 0,1이 아닌값으로 보낸다!

    // 자동넘김 지우기
    clearAuto();

}); ////////// click ///////////////


/*///////////////////////////////////
    함수명: chgbtn
    기능: 블릿 현재페이지에 맞게 변경하기
///////////////////////////////////////////////*/
function chgbtn() {

    /// 블릿변경하기 - class="on" 주기
    $(".bullet > ul > li").eq(sno).addClass("active")
        .siblings().removeClass("active");

} ////////////////////////////////////// chgbtn 함수 /////////////////



/// 소개영상 플레이 버튼 클릭시 모당찰 띄우기 /////////////////////////////
$(".palybtn").click(function () {
    console.log("클릭됐니?");
    $("#modal").fadeIn(500);
    $("body").css({
        overflowY: "hidden"
    });
});

// 닫기버튼 클릭시 모달창 끄기 //////////////////////
$("#modal span").click(function () {
    $("#modal").fadeOut(500);
    $("body").css({
        overflowY: "auto"
    });
    $("#mainVid").attr("src", "")
});

// 모달창외 바깥클릭시 모달창 닫기 ///////////////////
$("#modal").click(function () {
    $("#modal").fadeOut(500);
    $("body").css({
        overflowY: "auto"
    });
    $("#mainVid").attr("src", "")
});









}); // jQB ///////////////////////////////////////////////////
