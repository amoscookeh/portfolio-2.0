const mobileWidth = 640;
const desktopWidth = 1280;

enum ScreenType {
  Mobile = "mobile",
  Desktop = "desktop",
  Widescreen = "widescreen",
}

function getScreenType(width: number): ScreenType {
  if (width < mobileWidth) return ScreenType.Mobile;
  if (width < desktopWidth) return ScreenType.Desktop;
  return ScreenType.Widescreen;
}

export { ScreenType, getScreenType };
