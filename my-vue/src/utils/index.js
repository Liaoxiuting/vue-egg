//判断是pc端还是移动端
export const isMobileFlag = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  let is_mobile =
    ua.match(
      /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
    ) != null;
  return is_mobile;
};
