"use strict";
// 为btn添加到第一section的smooth scroll
const el_HeroBtn = document.querySelector(".hero__call");
const el_SectionCharacter = document.querySelector("#section__character");
el_HeroBtn.addEventListener("click", function () {
  el_SectionCharacter.scrollIntoView({ behavior: "smooth" });
});
// 使用事件委托为nav添加smooth scroll
const el_navs = document.querySelector(".nav__navigation");
el_navs.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__a")) {
    const targetScrollTo = document.querySelector(
      `${e.target.getAttribute("href")}`
    );
    targetScrollTo.scrollIntoView({ behavior: "smooth" });
  }
});
// 对tab选项式组件进行操作
const el_opinionTapsContainer = document.querySelector(".opinions__taps");
const el_opinionTaps = document.querySelectorAll(".taps__btn");
const el_opinionDetails = document.querySelectorAll(".opinion__details__entry");
let el_clickedTapConnectedDetail = document.querySelector(`.details__entry__1`);
const modelChangeSkill = function () {
  const el_targetOpinionLive2d = el_clickedTapConnectedDetail.querySelector(
    ".details__character__live2d"
  );
  const targetOpinionIntro = el_clickedTapConnectedDetail.querySelector(
    ".opinion__details__introduction"
  );
  targetOpinionIntro.addEventListener("click", function (e) {
    const clickedImg = e.target.closest(".skills__img");
    if (!clickedImg) return;
    el_targetOpinionLive2d.src = `imgs/${clickedImg.dataset.set}.webm`;
  });
};
el_opinionTapsContainer.addEventListener("click", function (e) {
  const el_clickedTap = e.target.closest("button");
  if (!el_clickedTap) return;
  el_opinionTaps.forEach((el_opinionTap) => {
    el_opinionTap.classList.remove("taps__btn__active");
  });
  el_opinionDetails.forEach((el_opinionDetail) =>
    el_opinionDetail.classList.remove("active__entry")
  );
  el_clickedTap.classList.add("taps__btn__active");
  el_clickedTapConnectedDetail = document.querySelector(
    `.details__entry__${el_clickedTap.dataset.tab}`
  );
  el_clickedTapConnectedDetail.classList.add("active__entry");
  modelChangeSkill();
});
modelChangeSkill();
// 为导航添加sticy类
const el_navContainer = document.querySelector(".nav__container");
const headerHeight = el_navContainer.getBoundingClientRect().height;
const el_header = document.querySelector(".header");
const headerObserverFunction = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) el_navContainer.classList.add("sticky");
  else el_navContainer.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(headerObserverFunction, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
headerObserver.observe(el_header);
// observe API
const el_sections = document.querySelectorAll("section");
const sectionObserverFunction = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__ultra");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionObserverFunction, {
  root: null,
  threshold: 0.15,
});
el_sections.forEach((el_section) => {
  sectionObserver.observe(el_section);
  el_section.classList.add("section__ultra");
});
// 延迟加载图像
const imgsWithDataSrc = document.querySelectorAll("img[data-src]");
const imgsWithDataSrcHeight = imgsWithDataSrc[0].getBoundingClientRect().height;
const imgsWithDataSrcCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("operator__img__blur");
  });
  observer.unobserve(entry.target);
};
const imgsWithDataSrcObserver = new IntersectionObserver(
  imgsWithDataSrcCallBack,
  {
    root: null,
    threshold: 0,
    rootMargin: `${imgsWithDataSrcHeight}px`,
  }
);
imgsWithDataSrc.forEach((imgWithDataSrc) =>
  imgsWithDataSrcObserver.observe(imgWithDataSrc)
);
// Slider Component
const sliderComponent = function () {
  const sliders = document.querySelectorAll(".slider__slide");
  const sliderArrowLeft = document.querySelector(".slider__arrow__left");
  const sliderArrowRight = document.querySelector(".slider__arrow__right");
  let curSlideCount = 0;
  const slidersLengh = sliders.length;
  const goSlide = function (curSlidePosition) {
    sliders.forEach((curSlider, curSliderIndex) => {
      curSlider.style.transform = `translateX(${
        100 * (curSliderIndex - curSlidePosition)
      }%)`;
    });
  };
  const nextSlider = function () {
    if (curSlideCount === slidersLengh - 1) {
      curSlideCount = 0;
    } else {
      curSlideCount++;
    }
    goSlide(curSlideCount);
    activeSliderDot(curSlideCount);
  };
  const prevSlider = function () {
    if (curSlideCount === 0) {
      curSlideCount = slidersLengh - 1;
    } else {
      curSlideCount--;
    }
    goSlide(curSlideCount);
    activeSliderDot(curSlideCount);
  };
  sliderArrowLeft.addEventListener("click", prevSlider);
  sliderArrowRight.addEventListener("click", nextSlider);
  // 为slider component 添加键盘监听
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlider();
    e.key === "ArrowRight" && nextSlider();
  });
  // slider component dots
  const sliderbButtom = document.querySelector(".slider__details__buttom");
  const sliderBottomCreateDots = function () {
    sliders.forEach((_, sliderIndex) => {
      sliderbButtom.insertAdjacentHTML(
        "beforeend",
        `<button class="slider__buttom__dot" data-slide="${sliderIndex}"></button>`
      );
    });
  };
  // 为slider component dots添加监听器
  sliderbButtom.addEventListener("click", function (e) {
    if (e.target.classList.contains("slider__buttom__dot")) {
      const { slide } = e.target.dataset;
      goSlide(slide);
      activeSliderDot(slide);
    }
  });
  const activeSliderDot = function (slideDotDataSlide) {
    const sliderDots = document.querySelectorAll(".slider__buttom__dot");
    sliderDots.forEach((slideDot) => {
      slideDot.classList.remove("active_details__buttom__btn");
    });
    const sliderTargetDot = document.querySelector(
      `.slider__buttom__dot[data-slide="${slideDotDataSlide}"]`
    );
    sliderTargetDot.classList.add("active_details__buttom__btn");
  };
  const init = function () {
    goSlide(0);
    sliderBottomCreateDots();
    activeSliderDot(0);
  };
  init();
};
sliderComponent();
// 注册组件
const navBtnEl = document.querySelector(".nav__btn");
const articleSatileBtnEl = document.querySelector(".article_satile__btn");
const signInCloseBtnEl = document.querySelector(".signIn__testimonial__close");
const signInFormBtnEl = document.querySelector(".signIn__form__btn");
const signInContainer = document.querySelector(".signIn__container");
const signInForm = document.querySelector(".signIn__testimonial__form");
const theMethodOfRemove = function () {
  signInContainer.classList.remove("none");
};
const theMethodOfAdd = function () {
  signInContainer.classList.add("none");
};
signInForm.addEventListener("click", function (e) {
  if (e.target.closest("button")) e.preventDefault();
});
signInCloseBtnEl.addEventListener("click", theMethodOfAdd);
signInFormBtnEl.addEventListener("click", theMethodOfAdd);
navBtnEl.addEventListener("click", theMethodOfRemove);
articleSatileBtnEl.addEventListener("click", theMethodOfRemove);
