gsap.registerPlugin(ScrollTrigger);

// 设置更高的刷新率，提升性能
gsap.ticker.fps(60);

window.addEventListener("load", ()=>{
    // 创建主要的滚动触发时间轴
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "+=150%", // 延长滚动距离，让动画更加缓慢和流畅
          pin: true,
          scrub: 1.2, // 增加scrub值，让滚动响应更柔和
          anticipatePin: 1, // 改善固定时的性能
          refreshPriority: -1 // 确保优先刷新
        },
      });

    // 第一阶段：图片缩放和3D变换
    tl.to(".image-container img", {
        scale: 2,
        z: 250,
        transformOrigin: "center center",
        duration: 0.3, // 30% 的动画时间
        ease: "power2.out", // 更自然的缓动
      }, 0)
      
      // 第二阶段：背景区域放大和阴影效果
      .to(".section.hero-section", {
        scale: 1.4,
        boxShadow: `10000px 0 0 0 rgba(0,0,0,0.6) inset`, // 稍微增强阴影
        transformOrigin: "center center",
        duration: 0.4, // 40% 的动画时间
        ease: "power1.inOut", // 平滑的进出缓动
        filter: "saturate(1.1)" // 稍微增强饱和度
      }, 0.1) // 稍微延迟开始，创建层次感
      
      // 黑白效果淡入动画（0.5秒持续时间）
      .to(".section.hero-section", {
        filter: "saturate(1.1) grayscale(1)", // 添加黑白效果
        duration: 0.5, // 0.5秒的淡入时间
        ease: "power2.inOut" // 平滑的缓动效果
      }, 0.2) // 在第二阶段稍后开始
      
      // 第三阶段：图片容器淡出
      .to(".image-container", {
        autoAlpha: 0,
        duration: 0.2, // 20% 的动画时间
        ease: "power2.in" // 加速淡出
      }, 0.5) // 在中段开始淡出
      
      // 第四阶段：高度调整和intro文字效果
      .to([".section.hero-section", ".intro"], {
        height: 400,
        duration: 0.3, // 30% 的动画时间
        ease: "power2.inOut"
      }, 0.6)
      
      // 最后阶段：intro文字的额外效果
      .to(".intro", {
        y: -50, // 轻微上移
        opacity: 0.9,
        duration: 0.2,
        ease: "power1.out"
      }, 0.8);

    // 添加一些额外的性能优化
    ScrollTrigger.config({
      limitCallbacks: true, // 限制回调频率
      syncInterval: 150     // 同步间隔
    });

    // 预加载关键帧以减少卡顿
    gsap.set([".image-container img", ".section.hero-section", ".intro"], {
      willChange: "transform, opacity, filter"
    });
});

