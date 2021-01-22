
/*copyright - Andrew Androsovych*/
function StepItem (idOfStep, regExpTest) {
  var idOfItem = idOfStep;
  var promptInstance = null;
  var pattern = regExpTest;
  var callback = null;
  /* get a parent node */
  var pNode = document.querySelector(`[data-form-item=${idOfStep}]`);
  /* check - is a node exists? */
  if (!pNode) {
    return null;
  }
  var inputNode = pNode.querySelector('input');
  var btnNext = pNode.querySelector('button.hoverable');
  /* assign a patern to an input */
  if (regExpTest) {
    inputNode.setAttribute('pattern', pattern.source);
  }
  /* add an event listener */
  /* 1)mouse */
  btnNext.addEventListener('click', onClick, false);
  /* 2) keybrd */
  pNode.addEventListener('keydown', onKeyPress, false);
/*an event handler for a keyboard*/
  function onKeyPress (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
      case 'Tab':
        // call the same event handler (as for button Next...)
        onClick(event);
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }

  /* an event handler for a button <Next..> */
  function onClick (evt) {
    var result = {};
    var errNode;
    var inpText;
    /* get a value of an item */
    inpText = inputNode.value;
    /* validation */
    if (inputNode.checkValidity() && (inpText.length > 0)) {
      /* a data valid */
      result[idOfItem] = inpText;
      callback(result);
    } else {
      /* an incorrect data */
      errNode = pNode.querySelector('.err');
      errNode.innerText = 'error!';
      /* call interval timer */
      window.setTimeout(clrError, 1000);
    }
  }

  /* clear an error */
  function clrError () {
    /* get a node */
    var errNode = pNode.querySelector('.err');
    /* clear an error */
    errNode.innerText = '';
  }

  return {
    registerCallback: function (x) {
      callback = x;
    },
    show: function (sw) {
      if (sw) {
        /* show an item */
        pNode.style.display = 'flex';
      } else {
        /* show an item */
        pNode.style.display = '';
      }
    },
    setPrompt: function (arrayOfVariants) {
      if (promptInstance) {
        promptInstance.updatePromptList(arrayOfVariants);
      }
    },
    addPromptInstance: function (instOfObj) {
      promptInstance = instOfObj;
    },
    setPattern: function (reg) {
      pattern = reg;
      inputNode.setAttribute('pattern', pattern.source);
    }

  };
}

/* a prompt manager */
function PromptMgr (idParentAttr) {
  var pNode = document.querySelector(`[data-form-item=${idParentAttr}]`);
  /* checking - is a node exists */
  if (!pNode) {
    return null;
  }
  /* get a wrapperr for prompts */
  var wrpNode = pNode.querySelector('datalist');
  if (!wrpNode) {
    return null;
  }

  return {
    updatePromptList: function (arrayPrompt) {
      PromptMgr.prototype.clearItems(wrpNode);
      PromptMgr.prototype.setItems(wrpNode, arrayPrompt);
    }
  };
}

PromptMgr.prototype.clearItems = function (parNode) {
  var arrayOfItems = parNode.children;
  /* convert child nodes to an array */
  arrayOfItems = Array.prototype.slice.call(arrayOfItems);
  /* iterate and remove children */
  arrayOfItems.forEach(function (val) {
    parNode.removeChild(val);
  });
};

PromptMgr.prototype.setItems = function (parNode, promptArray) {
  var nodes = [];
  var tmp;
  /* new nodes and set attributes are created */
  promptArray.forEach(function (val) {
    tmp = document.createElement('option');
    tmp.setAttribute('value', val);
    nodes.push(tmp);
  });
  /* assign to a parent */
  nodes.forEach(function (val) {
    parNode.appendChild(val);
  });
};

/** final window class */
function ServerPostService (attrOfNode) {
  var callback = null;
  var pNode = document.querySelector(`[data-form-item=${attrOfNode}]`);
  if (!pNode) {
    return null;
  }
  /* get a button node */
  var btnNode = pNode.querySelector('button');
  /* add an event listener */
  btnNode.addEventListener('click', onClick, false);

  function onClick (msg) {
    /* make a button inactive */
    btnNode.setAttribute('disabled', 'true');
    btnNode.innerText = 'Your data has been sent!';
    /* set an another image */
    var imgNode = pNode.querySelector('img');
    imgNode.setAttribute('src', 'finish.svg');
    callback();
  }

  return {
    show: function (bl) {
      if (bl) {
        /* show */
        pNode.style.display = 'flex';
      } else {
        /* hide */
        pNode.style.display = '';
      }
    },
    bindInterface: function (f) {
      callback = f;
    }
  };
}

function FormMgr (parentId) {
  var countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central Arfrican Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauro', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
  var jobs = {
    sales: ['sales manager', 'saler', 'director'],
    logistik: ['picker', 'manager', 'storekeeper'],
    transport: ['manager', 'driver A', 'driver B', 'driver C', 'driver D', 'train driver'],
    building: ['builder', 'carpenter', 'bricklayer', 'electrican', 'plumber', 'plasterer', 'crane operator', 'estimator'],
    aviation: ['pilot', 'aviadispatcher', 'bortprovodnik', 'manager'],
    engeneering: ['service engeneer', 'engeneer', 'architect']
  };
  var allTheData = {};
  var callbackFunc = null;
  var tmp = 0;
  var indexOfItem = 0;
  var listOfItems = [];
  var finishNode = new ServerPostService('done');
  var listParentNode = document.querySelector('ul.itemsWrapper');
  if (!listParentNode) {
    return null;
  }
  /* get a list and convert it to an array */

  var listOfNodes = listParentNode.children;
  listOfNodes = Array.prototype.slice.call(listOfNodes);
  /* iterate all the array and create nodes */
  for (tmp = 0; tmp < (listOfNodes.length - 1); tmp++) {
    listOfItems[tmp] = new StepItem(listOfNodes[tmp].getAttribute('data-form-item'), /[A-Za-z ]+/);
  }
  /* set patterns */
  /* 1) name */
  listOfItems[0].setPattern(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm);
  /* 2) country */
  listOfItems[1].setPattern(/([A-Za-z])\w+/);
  listOfItems[1].addPromptInstance(new PromptMgr('country'));
  /* 3) age */
  listOfItems[2].setPattern(/\d+/);
  /* 4)job area */
  listOfItems[3].addPromptInstance(new PromptMgr('job_area'));
  /* 5) specifity */
  listOfItems[4].addPromptInstance(new PromptMgr('specifity'));
  /* 6) experience */
  listOfItems[5].setPattern(/\d+/);
  /* 7) email */
  listOfItems[6].setPattern(/[A-Za-z@._]+/g);
  /* bind callback function */
  listOfItems.forEach(function (val) {
    val.registerCallback(onNext);
  });
  /* the last handler */
  function onSend () {
    callbackFunc(allTheData);
  }

  finishNode.bindInterface(onSend);
  /* items event handler */
  function onNext (data) {
    var temp;
    /* get a key and a value */
    tmp = Object.keys(data)[0];
    /* assign a result */
    allTheData[tmp] = data[tmp];

    switch (indexOfItem) {
      case 0:
        /* country */
        listOfItems[indexOfItem + 1].setPrompt(countries);
        break;
      case 2:
        temp = Object.keys(jobs);
        listOfItems[indexOfItem + 1].setPrompt(temp);
        break;
      case 3:
        temp = jobs[allTheData.job_area];
        listOfItems[indexOfItem + 1].setPrompt(temp);
        break;
      case 6:
        /* the last step */
        /* hide current */
        listOfItems[indexOfItem].show(false);
        /* show last */
        finishNode.show(true);
        return;
        break;
    }
    /* hide a current item */
    listOfItems[indexOfItem].show(false);
    indexOfItem++;
    /* show next */
    listOfItems[indexOfItem].show(true);
  }
  return {
    showOne: function () {
      listOfItems[0].show(true);
    },
    bindSendCallback: function (f) {
      callbackFunc = f;
    }
  };
}

function testFunc001 (val) {
  console.log(JSON.stringify(val));
}

var tst0001;
window.onload = function () {
  /* after loading a document */
  tst0001 = new FormMgr('itemsWrapper');
  tst0001.showOne();
  tst0001.bindSendCallback(testFunc001);
};
