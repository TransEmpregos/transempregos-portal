(function () {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      app: './dist/public/app',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      'tslib': 'npm:tslib/tslib.js',
      'rxjs': 'npm:rxjs'
    },
    packages: {
      'dist/public/app': {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      tslib: {
        defaultExtension: 'js'
      }
    }
  });
})();