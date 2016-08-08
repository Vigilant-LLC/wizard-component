var Modal = function(params) {
  if(!params || typeof(params) !== 'object') { params = {}; }
  var _noop = function() {};

  var _ajaxSuccessResponses = [ false ];
  var _modalAjaxIndex = 0;
  var _$modal;
  var _params = $.extend(
    true,
    {
      /*** Template Content ***/
      templateUrl: '', /*** required on creation ***/
      templateDomId: '#modal', /*** required on creation ***/

      /*** Modal Content ***/
      size: '',
      title: '',
      titleDomId: '#modalTitle', /* required on creation */
      ribbonContent: '',
      ribbonContentUrl: '', /* required on creation */
      ribbonContentDomId: '#modalRibbonContent', /* required on creation */
      mainContent: '',
      mainContentUrl: '', /* required on creation */
      mainContentDomId: '#modalMainContent', /* required on creation */

      /*** Buttons ***/
      // All button functions will be passed the modal object so that they may
      // utilize anything from the modal that they choose.
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
      // Method runs before the modal is shown and is passed the modal object
      // that has already been set up so that the method can clean up input fields
      // or set up input fields depending on what its needs are
      // first parameter will be the modal jQuery object
      // second parameter will be the actual Modal object to reset
      // third parameter will be the data object that can be used to set up the default options
      onShowFunction: _noop, /* required on creation */

      //Method runs when the modal is shown
      // first parameter will be the modal jQuery object
      // second parameter will be the actual Modal object to reset
      // third parameter will be the data object that can be used to set up the default options
      onShownFunction: _noop /* required on creation */
    },
    params
  );

  var _isModalInDomTimeout;
  var _isModalInDomTimeoutCount = 1200; // 1 minute at 50 milisecond intervals
  var _checkIfModalIsReady = function() {
    clearTimeout(_isModalInDomTimeout);
    if(_isModalInDomTimeoutCount-- > 0) {
      if(loadedModalComponent) {
        _ajaxSuccessResponses[_modalAjaxIndex] = true;
      } else {
        _isModalInDomTimeout = setTimeout(function() {
          _checkIfModalIsReady();
        }, 50);
      }
    }
  }

  /*** Grab the modal html ***/
  if(typeof(loadedModalComponent) === 'undefined') {
    $('body').append('<script>var loadedModalComponent = false;</script>');
    $.ajax({
      type: 'GET',
      url: _params.templateUrl,
      success: function(html) {
        loadedModalComponent = true;
        _ajaxSuccessResponses[_modalAjaxIndex] = true;
        $('body').append(html);
      },
      error: function(err) {
        //TODO: add in error function & maybe a retry mechanism
      }
    });
  } else {
    _checkIfModalIsReady();
  }

  if(typeof(_params.ribbonContentUrl) === 'string' && _params.ribbonContentUrl.length != 0) {
    var ribbonAjaxIndex = _ajaxSuccessResponses.length;
    _ajaxSuccessResponses.push(false);
    $.ajax({
      type: 'GET',
      url: _params.ribbonContentUrl,
      success: function(content) {
        _params.ribbonContent = content;
        _ajaxSuccessResponses[ribbonAjaxIndex] = true;
      },
      error: function(err) {
        // TODO: clean this up to be a more friendly response
        _params.ribbonContent = err;
      }
    });
  }

  if(typeof(_params.mainContentUrl) === 'string' && _params.mainContentUrl.length != 0) {
    var mainContentAjaxIndex = _ajaxSuccessResponses.length;
    _ajaxSuccessResponses.push(false);
    $.ajax({
      type: 'GET',
      url: _params.mainContentUrl,
      success: function(content) {
        _params.mainContent = content;
        _ajaxSuccessResponses[mainContentAjaxIndex] = true;
      },
      error: function(err) {
        // TODO: clean this up to be a more friendly response
        _params.mainContent = err;
      }
    });
  }

  var _backButtonFunction = function() {
    _params.backButtonFunction(_$modal);
  };

  var _cancelButtonFunction = function() {
    _params.cancelButtonFunction(_$modal);
  };

  var _nextButtonFunction = function() {
    _params.nextButtonFunction(_$modal);
  };

  var _setUpModal = function() {
    if(!_$modal) { _$modal = $(_params.templateDomId); }
    $('.modal-dialog', _$modal).removeClass('modal-sm modal-lg')
      .addClass(_params.size);
    $(_params.titleDomId, _$modal).html(_params.title);
    $(_params.ribbonContentDomId, _$modal).html(_params.ribbonContent);
    $(_params.mainContentDomId, _$modal).html(_params.mainContent);

    $(_params.backButtonDomId, _$modal).html(_params.backButtonText);
    $(_params.backButtonDomId, _$modal).off('click')
      .on('click', _backButtonFunction);
    $(_params.backButtonDomId, _$modal).show();
    if(!_params.backButtonIsVisible) {
      $(_params.backButtonDomId, _$modal).hide();
    }

    $(_params.cancelButtonDomId, _$modal).html(_params.cancelButtonText);
    $(_params.cancelButtonDomId, _$modal).off('click')
      .on('click', _cancelButtonFunction);
    $(_params.cancelButtonDomId, _$modal).show();
    if(!_params.cancelButtonIsVisible) {
      $(_params.cancelButtonDomId, _$modal).hide();
    }

    $(_params.nextButtonDomId, _$modal).html(_params.nextButtonText);
    $(_params.nextButtonDomId, _$modal).off('click')
      .on('click', _nextButtonFunction);
    $(_params.nextButtonDomId, _$modal).show();
    if(!_params.nextButtonIsVisible) {
      $(_params.nextButtonDomId, _$modal).hide();
    }
  };

  return {
    setSize: function(size) {
      if(typeof(size) === 'string' && size.length > 0) {
        _params.size = size;
      }
      return this;
    },
    setTitle: function(title) {
      if(typeof(title) === 'string' && title.length > 0) {
        _params.title = title;
      }
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
    getModal: function() {
      return $(_params.templateDomId);
    },
    isModalReady: function() {
      var readyCount = 0;
      for(var i = 0; i < _ajaxSuccessResponses.length; i++) {
        if(_ajaxSuccessResponses[i] === true) { readyCount++; }
      }
      return (readyCount === _ajaxSuccessResponses.length) ? true : false;
    },
    show: function(data) {
      if(!this.isModalReady()) {
        // TODO: add in a friendly message alerting that the modal is not ready yet
        return false;
      } else {
        this.update();
        _params.onShowFunction(_$modal, this, data);
        _$modal.off('shown.bs.modal')
          .on('shown.bs.modal', _params.onShownFunction(_$modal, this, data));
        _$modal.modal('show');
      }
    },
    update: function() { _setUpModal(); }
  };
};
