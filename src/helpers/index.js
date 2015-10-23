//https://gist.github.com/LeverOne/1308368 crazy short uuid
export function uuid(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b};

export function getCaretPosition(field) {
  let pos = 0;
  if (document.selection) {
    field.focus();
    let sel = document.selection.createRange();
    sel.moveStart('character', -field.value.length);
    pos = sel.text.length;
  } else if (field.selectionStart || field.selectionStart == '0') {
    pos = field.selectionStart;
  }

  return pos;
}

export function setSelectRange(field, start, end) {
  if (field.setSelectionRange) {
    field.focus();
    field.setSelectionRange(start, end);
  } else if (field.createTextRange) {
    let range = field.createTextRange();
    range.collapse(true);
    range.moveStart('character', start);
    range.moveEnd('character', end);
    range.select();
    field.focus();
  } else if( typeof field.selectionStart != 'undefined' ) {
    field.selectionStart = start;
    field.selectionEnd = end;
    field.focus();
  }
}

export function getInputSelection(el) {
  //http://stackoverflow.com/questions/3964710/replacing-selected-text-in-the-textarea
  var start = 0, end = 0, normalizedValue, range,
    textInputRange, len, endRange;

  if (typeof el.selectionStart == 'number' && typeof el.selectionEnd == 'number') {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() == el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, '\n');

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart('character', -len);
        start += normalizedValue.slice(0, start).split('\n').length - 1;

        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd('character', -len);
          end += normalizedValue.slice(0, end).split('\n').length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end
  };
}

export function PrefixedEvent(element, type, callback) {
  //http://www.sitepoint.com/css3-animation-javascript-event-handlers/
  const pfx = ['webkit', 'moz', 'MS', 'o', ''];
  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) type = type.toLowerCase();
    element.addEventListener(pfx[p]+type, callback, false);
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}