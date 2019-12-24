class AIIBCommon {
  static xs = 480;

  static sm = 768;

  static md = 992;

  static lg = 1200;

  static xl = 1600;

  static minXS = window.innerWidth < 480;

  static minSM = window.innerWidth < 768;

  static minMD = window.innerWidth < 992;

  static minLG = window.innerWidth < 1200;

  static minXL = window.innerWidth < 1600;

  static isIE = () => !!(window.ActiveXObject || 'ActiveXObject' in window);

  static isChrome = () => {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('chrome') >= 0;
  };

  static isFirefox = () => {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('firefox') >= 0;
  };

  static isSafari = () => {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('safari') >= 0;
  };

  static isEdge = () => {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('edge') >= 0;
  };
}

if (AIIBCommon.isIE()) {
  //   let hasadobe = this.supportsPdfActiveX;
  //   return <IEPDFView hasAdobe={hasadobe} fileUrl={url} onClose={this.onClose.bind(this)} />;
}
if (AIIBCommon.isEdge()) {
  //   return <EdgePDFView fileUrl={url} onClose={this.onClose.bind(this)} />;
}
if (AIIBCommon.isChrome()) {
  //   return <ChromePDFView fileUrl={url} onClose={this.onClose.bind(this)} />;
}
if (AIIBCommon.isSafari()) {
  //   return <SafariPDFView fileUrl={url} onClose={this.onClose.bind(this)} />;
}
if (AIIBCommon.isFirefox()) {
  //   return <FirefoxPDFView fileUrl={url} onClose={this.onClose.bind(this)} />;
}
// return <O365PDFView fileUrl={url} libName={this.props.libName} onClose={this.onClose.bind(this)} />;
