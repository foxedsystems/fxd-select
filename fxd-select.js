/** 
 * @file FANCY XTREME DROPDOWN SELECT: FXD-SELECT.JS
 * Replaces Select HTML-Element with Bootstrap 5 Dropdown with live-search (filter option)
 * 
 * @version 0.1
 * @author Manuel Fuchs {@link https://fxd.at|fxd.at}
 * @copyright 2023
 * 
 */

/**
 * @namespace Element
 */

/**
 * Replaces Select HTML-Element with Bootstrap 5 Dropdown with live-search (filter option)
 * @param {Object} [options] - Options for the Dropdown
 * @param {string} [options.wrapperClass] - CSS-class(es) for the wrapper (all generated Elements are within this wrapper)
 * @param {string} [options.buttonClass=form-select text-start] - CSS-class(es) for the button which represents the select/dropdown
 * @param {boolean} [options.showFilter=true] - Determines if search input field should be displayed
 * @param {string} [options.filterPlaceholder=Search] - Sets placeholder text for search input field
 * @param {boolean} [options.showDivider=true] - Determines if a hr is inserted between search input field and select options
 * @param {string} [options.noResultsText=No entries found] - Sets text to display when no entries are found
 * @param {string} [options.maxHeight=12em] - Sets CSS style max-height for options list. can be set to 'auto' for no limit
 * @example 
 * //replaces <select>-element with ID 'my-select' with "maxHeight" option set to "auto"
 * document.getElementById('my-select').toFxdSelect({ maxHeight: "auto" });
 */
Element.prototype.toFxdSelect = function (options = {}) {
    //Set default values
    const defaultOptions = {
        wrapperClass: "",
        buttonClass: "form-select text-start",
        showFilter: true,
        filterPlaceholder: "Search",
        showDivider: true,
        noResultsText: "No entries found",
        maxHeight: "12em"
    };

    //Apply provided options to default options
    const mergedOptions = Object.keys(defaultOptions).reduce((acc, key) => {
        if (options.hasOwnProperty(key)) {
            acc[key] = options[key];
        } else {
            acc[key] = defaultOptions[key];
        }
        return acc;
    }, {});

    const selectElement = this;

    if (selectElement.tagName !== 'SELECT') {
        console.error('Element is not a select element.');
        return;
    }

    const selectOptions = selectElement.querySelectorAll('option');
    const selectedOption = selectElement.querySelector('option[selected]');
    const selectedValue = selectedOption ? selectedOption.value : '';

    // Create wrapper div and dropdown button
    const wrapper = document.createElement('div');
    wrapper.classList.add('dropdown');
    wrapper.classList.addString(mergedOptions.wrapperClass);

    const dropdownButton = document.createElement('button');
    dropdownButton.classList.addString(mergedOptions.buttonClass);
    dropdownButton.type = 'button';
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-haspopup', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.innerHTML = selectedOption ? selectedOption.textContent : selectOptions[0].textContent;
    wrapper.appendChild(dropdownButton);


    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.addString('dropdown-menu p-0');


    // Create search input
    if (mergedOptions.showFilter) {
        //wrapper
        const searchWrapper = document.createElement('div');
/*        searchWrapper.classList.addString('p-2');*/
        dropdownMenu.appendChild(searchWrapper);

        //container
        const searchContainer = document.createElement('div');
        searchContainer.classList.addString('form-control form-control-sm w-auto d-flex flex-fill align-items-center p-1 m-1');
        searchWrapper.appendChild(searchContainer);

        //input
        const searchBar = document.createElement('input');
        searchBar.classList.addString('form-control p-0 border-0 rounded-0 shadow-none');
        searchBar.setAttribute('placeholder', mergedOptions.filterPlaceholder)
        searchBar.addEventListener("input", (event) => {
            const nri = dropdownMenu.querySelector(".no-result");
            nri.hideWithBS();
            const items = dropdownMenu.querySelectorAll(".dropdown-item");
            items.showWithBS();
            const list = items.whereNotContains(searchBar.value);
            list.hideWithBS();
            if (items.length == list.length) nri.showWithBS();
        });
        searchContainer.appendChild(searchBar);

        //reset btn
        const searchReset = document.createElement('i');
        searchReset.type = 'button';
        searchReset.classList.addString('bx bx-x pointer');
        searchReset.setAttribute('aria-label', 'reset');
        searchReset.addEventListener("click", (event) => {
            searchBar.value = "";
            searchBar.dispatchEvent(new Event("input"));
            searchBar.select();
            event.preventDefault();
            event.stopPropagation();
        });
        searchContainer.appendChild(searchReset);

        // Add Click Event to Button for select
        dropdownButton.addEventListener("click", (event) => {
            searchBar.select();
        });

        if (mergedOptions.showDivider) {
            // Create divider
            const divider = document.createElement('hr');
            divider.classList.add('m-0');
            dropdownMenu.appendChild(divider);
        }

        //no results item
        const noResultItem = document.createElement('div');
        noResultItem.classList.addString('no-result text-muted px-2 small');
        noResultItem.textContent = mergedOptions.noResultsText;
        noResultItem.hideWithBS();
        dropdownMenu.appendChild(noResultItem);
    }


    // Create options from select
    const listWrapper = document.createElement('div');
    if (mergedOptions.maxHeight.length > 0 && mergedOptions.maxHeight != "auto") {
        listWrapper.style.overflowY = 'scroll';
        listWrapper.style.maxHeight = mergedOptions.maxHeight;
    }

    dropdownMenu.appendChild(listWrapper);

    selectOptions.forEach(option => {
        const dropdownItem = document.createElement('a');
        dropdownItem.classList.add('dropdown-item');
        dropdownItem.href = option.value;
        dropdownItem.textContent = option.textContent;

        dropdownItem.addEventListener('click', event => {
            event.preventDefault();
            selectElement.value = option.value;
            selectElement.dispatchEvent(new Event('change'));
        });

        listWrapper.appendChild(dropdownItem);
    });

    wrapper.appendChild(dropdownMenu);

    // Add wrapper div after select element
    selectElement.parentNode.insertBefore(wrapper, selectElement.nextSibling);

    // Hide original select element
    selectElement.hideWithBS();

    // Set selected value on original select element
    selectElement.value = selectedValue;

    // Update dropdown when select changed
    selectElement.addEventListener('change', (event) => {
        dropdownButton.innerHTML = selectElement.selectedOptions[0].textContent;
    });
};


/**
 * Hides Element by applying 'd-none' class (Bootstrap)
 */
Element.prototype.hideWithBS = function () {
    this.classList.add('d-none');
};
/**
 * Shows Element by removing 'd-none' class (Bootstrap)
 */
Element.prototype.showWithBS = function () {
    this.classList.remove('d-none');
};

/**
 * @namespace NodeList
 */

/**
 * Checks each Node of NodeList if provided string is present in innerHTML text
 * @param {any} searchStr - the string to look for
 * @param {any} [matchCase=false] - wether case should matter during search
 * @returns {Array} - returns Array with matched Nodes
 */
NodeList.prototype.whereContains = function (searchStr, matchCase = false) {
    const list = [];

    this.forEach((node) => {
        console.log(node);
        const txt = matchCase ? node.innerHTML : node.innerHTML.toLowerCase();
        if (!matchCase) searchStr = searchStr.toLowerCase();
        if (txt.includes(searchStr)) list.push(node);
    });

    return list;
};
/**
 * Checks each Node of NodeList if provided string is NOT present in innerHTML text
 * @param {any} searchStr - the string to look for
 * @param {any} [matchCase=false] - wether case should matter during search
 * @param {any} [separateBySpace=true] - wether the searchStr should be split by space character to enable "word-based" search
 * @returns {Array} - returns Array with Nodes where the string is not present
 */
NodeList.prototype.whereNotContains = function (searchStr, matchCase = false, separateBySpace = true) {
    const list = [];

    this.forEach((node) => {
        const txt = matchCase ? node.innerHTML : node.innerHTML.toLowerCase();
        if (!matchCase) searchStr = searchStr.toLowerCase();

        if (separateBySpace) {
            const searchArray = searchStr.split(" ");
            searchArray.every((str) => {
                console.log(str);
                if (!txt.includes(str)) {
                    list.push(node);
                    return false;
                }
                return true;
            });
        } else {
            if (!txt.includes(searchStr)) list.push(node);
        }
    });

    return list;
};
/**
 * Hides all Elements from a NodeList using internal method (BS)
 */
NodeList.prototype.hideWithBS = function () {
    this.forEach((node) => { node.hideWithBS(); })
};
/**
 * Shows all Elements from a NodeList using internal method (BS)
 */
NodeList.prototype.showWithBS = function () {
    this.forEach((node) => { node.showWithBS(); })
};


/**
 * @namespace Array
 */

/**
 * Hides all Elements from Array after checking if it is an Element using internal method (BS)
 */
Array.prototype.hideWithBS = function () {
    this.forEach((item) => { if (isElement(item)) item.hideWithBS(); })
};

/**
 * Shows all Elements from Array after checking if it is an Element using internal method (BS)
 */
Array.prototype.showWithBS = function () {
    this.forEach((item) => { if (isElement(item)) item.showWithBS(); })
};


///**
// * @namespace Object
// */

///**
// * Checks if an Object is of type Element
// * @returns {boolean} - True if Object is of type Element
// */
//Object.prototype.isElement = function () {
//    return this instanceof Element;
//};

function isElement(elem) {
    return elem instanceof Element;
}


/**
 * @namespace DOMTokenList
 */

/**
 * Adds Tokens to a DOMTokenList from a list provided as a space-separated string. Used for adding multiple CSS classes.
 * @param {string} str
 */
DOMTokenList.prototype.addString = function (str) {
    if (str.length == 0) return;
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        if (!this.contains(arr[i])) this.add(arr[i]);
    }
}

if (typeof jQuery != 'undefined') {
    // jQuery is present
    jQuery.fn.toFxdSelect = function (options) {
        var select = $(this)[0];
        select.toFxdSelect(options);
    };
}