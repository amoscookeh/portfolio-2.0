const mobileWidth = 640;
const tabletWidth = 1024;
const desktopWidth = 1280;

enum ScreenType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
  Widescreen = "widescreen",
}

function getScreenType(width: number): ScreenType {
  if (width < mobileWidth) return ScreenType.Mobile;
  if (width < tabletWidth) return ScreenType.Tablet;
  if (width < desktopWidth) return ScreenType.Desktop;
  return ScreenType.Widescreen;
}

export { ScreenType, getScreenType };
