var Modal = function(params) {
  if(!params || typeof(params) !== 'object') { params = {}; }
  var _noop = function() {};

  var _params = $.extend(
    true,
    {
      /*** Template Content ***/
      templateUrl: '', /*** required on creation ***/
      templateDomId: '#modal', /*** required on creation ***/

      /*** Modal Content ***/
      title: '',
      titleDomId: '#modalTitle', /* required on creation */
      ribbonContent: '',
      ribbonContentDomId: '#modalRibbonContent', /* required on creation */
      mainContent: '',
      mainContentDomId: '#modalMainContent', /* required on creation */

      /*** Buttons ***/
      backButtonText: 'Back',
      backButtonFunction: _noop,
      backButtonIsVisible: false,
      backButtonDomId: '#modalBackButton', /* required on creation */
      cancelButtonText: 'Cancel',
      cancelButtonFunction: _noop,
      cancelButtonIsVisible: true,
      cancelButtonDomId: '#modalCancelButton', /* required on creation */
      nextButtonText: 'Next',
      nextButtonFunction: _noop,
      nextButtonIsVisible: true,
      nextButtonDomId: '#modalNextButton', /* required on creation */

      /*** Modal Actions ***/
      // Method runs before the modal is shown, and is passed the modal object
      // that has already been set up so that the method can clean up input fields
      // or set up input fields depending on what its needs are
      // first parameter will be the modal jQuery object
      // second parameter will be the data object that can be used to set up the default options
      onShownFunction: _noop
    },
    params
  );

  /*** Grab the modal html ***/
  if(typeof(loadedModalComponent) === 'undefined') {
    $('body').append('<script>var loadedModalComponent = false;</script>');
    $.ajax({
      type: 'GET',
      url: _params.templateUrl,
      success: function(html) {
        loadedModalComponent = true;
        $('body').append(html);
      },
      error: function(err) {
        //TODO: add in error function & maybe a retry mechanism
      }
    });
  }

  var _setUpModal = function(data) {
    $modal = $(_params.templateDomId);
    $(_params.titleDomId, $modal).html(_params.title);
    $(_params.ribbonContentDomId, $modal).html(_params.ribbonContent);
    $(_params.mainContentDomId, $modal).html(_params.mainContent);

    $(_params.backButtonDomId, $modal).html(_params.backButtonText);
    $(_params.backButtonDomId, $modal)
    .off('click')
    .on('click', _params.backButtonFunction);
    $(_params.backButtonDomId, $modal).show();
    if(!_params.backButtonIsVisible) {
      $(_params.backButtonDomId, $modal).hide();
    }

    $(_params.cancelButtonDomId, $modal).html(_params.cancelButtonText);
    $(_params.cancelButtonDomId, $modal)
    .off('click')
    .on('click', _params.cancelButtonFunction);
    $(_params.cancelButtonDomId, $modal).show();
    if(!_params.cancelButtonIsVisible) {
      $(_params.cancelButtonDomId, $modal).hide();
    }

    $(_params.nextButtonDomId, $modal).html(_params.nextButtonText);
    $(_params.nextButtonDomId, $modal)
    .off('click')
    .on('click', _params.nextButtonFunction);
    $(_params.nextButtonDomId, $modal).show();
    if(!_params.nextButtonIsVisible) {
      $(_params.nextButtonDomId, $modal).hide();
    }

    _params.onShownFunction($modal, data);
    return $modal;
  };

  return {
    setTitle: function(title) {
      if(typeof(title) === 'string' && title.length > 0) { _params.title = title; }
      return this;
    },
    setRibbonContent: function(ribbonContent) {
      if(typeof(ribbonContent) === 'string' && ribbonContent.length > 0) {
        _params.ribbonContent = ribbonContent;
      }
      return this;
    },
    setMainContent: function(mainContent) {
      if(typeof(mainContent) === 'string' && mainContent.length > 0) {
        _params.mainContent = mainContent;
      }
      return this;
    },
    setBackButtonText: function(buttonText) {
      if(typeof(buttonText) === 'string' && buttonText.length > 0) {
        _params.backButtonText = buttonText;
      }
      return this;
    },
    setBackButtonFunction: function(buttonFunction) {
      if(typeof(buttonFunction) === 'function') {
        _params.backButtonFunction = buttonFunction;
      }
      return this;
    },
    setBackButtonIsVisible: function(buttonIsVisible) {
      if(typeof(buttonIsVisible) === 'boolean') {
        _params.backButtonIsVisible = buttonIsVisible;
      }
      return this;
    },
    setCancelButtonText: function(buttonText) {
      if(typeof(buttonText) === 'string' && buttonText.length > 0) {
        _params.cancelButtonText = buttonText;
      }
      return this;
    },
    setCancelButtonFunction: function(buttonFunction) {
      if(typeof(buttonFunction) === 'function') {
        _params.cancelButtonFunction = buttonFunction;
      }
      return this;
    },
    setCancelButtonIsVisible: function(buttonIsVisible) {
      if(typeof(buttonIsVisible) === 'boolean') {
        _params.cancelButtonIsVisible = buttonIsVisible;
      }
      return this;
    },
    setNextButtonText: function(buttonText) {
      if(typeof(buttonText) === 'string' && buttonText.length > 0) {
        _params.nextButtonText = buttonText;
      }
      return this;
    },
    setNextButtonFunction: function(buttonFunction) {
      if(typeof(buttonFunction) === 'function') {
        _params.nextButtonFunction = buttonFunction;
      }
      return this;
    },
    setNextButtonIsVisible: function(buttonIsVisible) {
      if(typeof(buttonIsVisible) === 'boolean') {
        _params.nextButtonIsVisible = buttonIsVisible;
      }
      return this;
    },
    show: function(data) { _setUpModal(data).modal('show'); }
  };
};
