// ==UserScript==
// @name         Multicol DuckDuckGo
// @description  DuckDuckGo in multi-columns view
// @namespace    https://github.com/sumadoratyper/multicol-ddg
// @homepage     https://github.com/sumadoratyper/multicol-ddg
// @version      0.1.0
// @license      MIT
// @author       Teterumu
// @match        https://duckduckgo.com/?q=*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==
(function() {
  GM_addStyle(`
  div.site-wrapper{
    max-width: 1920px;
    margin: 0 auto;
  }

  .is-not-mobile-device,
  .is-not-mobile-device body,
  .is-not-mobile-device .site-wrapper,
  .is-link-style-exp.is-not-mobile-device #links_wrapper,
  .is-not-mobile-device .serp__results{
    min-width: initial !important;
  }

  div.header__search-wrap{
    padding-left: 60px;
  }

  a.header__logo-wrap{
    justify-content: initial;
  }

  span.header__logo{
    margin-left: 7px;
  }

  div#duckbar{
    padding-left: 0;
  }


  div#links_wrapper{
    padding-left: 0;
  }

  div#web_content_wrapper > div.cw,
  div.results--main{
    max-width: initial;
  }

  div#links{
    display: flex;
    flex-wrap: wrap;
  }

  div#links.multicol-ddg-two-columns div.nrn-react-div,
  div#links.multicol-ddg-three-columns div.nrn-react-div{
    margin: 0 1rem 1rem 0;
    border-top: thin solid gray;
  }

  div#links.multicol-ddg-two-columns div.nrn-react-div{
    flex-basis: calc((100% - 2rem) / 2);
    min-width: calc((100% - 2rem) / 2);
  }

  div#links.multicol-ddg-three-columns div.nrn-react-div{
    flex-basis: calc((100% - 3rem) / 3);
    min-width: calc((100% - 3rem) / 3);
  }

  div.has-pagenum{
    display: none !important;
  }

  div.result--more{
    flex-basis:100%;
  }

  div.module-slot{
     display: none;
  }

  div.FTrf7TqAcfxxEQ_3nfUg,
  div.feedback-btn,
  div.results--sidebar{
    display: none !important;
  }

  div.zci__main{
    padding-left: 0;
  }
  `);

  function convertRemToPx(rem) {
    const fontsize = getComputedStyle(document.documentElement).getPropertyValue('font-size');
    return rem * parseFloat(fontsize);
  }

  function setClass(elem, value) {
    elem.setAttribute('class', value);
  }

  function optimizeLayout() {
    const results = document.getElementById("links");
    const resultsWidth = results.offsetWidth;
    const maxColumnCount = 3;
    const minColumnWidth = convertRemToPx(30);
    const columnsGap = convertRemToPx(1);
    const twoColumnsMinWidth = (minColumnWidth + columnsGap) * 2;
    const threeColumnsMinWidth = (minColumnWidth + columnsGap) * 3;

    if (threeColumnsMinWidth < resultsWidth) {
      setClass(results, "multicol-ddg-three-columns");

    } else if (twoColumnsMinWidth < resultsWidth) {
      setClass(results, "multicol-ddg-two-columns");

    } else {
      setClass(results, "multicol-ddg-single-column");
    }
  }

  window.addEventListener("load", optimizeLayout, false);
  window.addEventListener("resize", optimizeLayout, false);
})();
