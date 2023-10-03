import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState, lazy } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input = memo(({
  className,
  value,
  type = "text",
  onChange,
  placeholder,
  autoFocus,
  ...otherProps
}: InputProps) => {

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      ref.current?.focus?.();
    }
  }, [ref.current])


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    // setCaretPosition(e.target.value.length)
    // console.log('e?.target?.selectionStart', e?.target?.selectionStart);
  }

  const onBlur = () => {
    setIsFocused(false);
  }

  const onFocus = () => {
    setIsFocused(true);
  }

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
    // console.log('e?.target?.selectionStart', e?.target?.selectionStart)
    // const { start } = getCaretPosition(e.target);
    // setCaretPosition(start);
  }

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder &&
        <div className={cls.placeholder}>
          {`${placeholder} >`}
        </div>
      }
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.Input}
          onBlur={onBlur}
          onFocus={onFocus}
          onSelect={onSelect}

          {...otherProps} />
        {isFocused && (<span
          className={cls.caret}
          style={{ left: `${caretPosition * 8.8}px` }}
        />)}
      </div>
    </div>
  )
});

// function getCaretPosition(el: any) {
//   var start = 0, end = 0, normalizedValue, range,
//     textInputRange, len, endRange;

//   if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
//     start = el.selectionStart;
//     end = el.selectionEnd;
//   } else {
//     const doc = document as any;
//     range = doc.selection.createRange();

//     if (range && range.parentElement() == el) {
//       len = el.value.length;
//       normalizedValue = el.value.replace(/\r\n/g, "\n");

//       // Create a working TextRange that lives only in the input
//       textInputRange = el.createTextRange();
//       textInputRange.moveToBookmark(range.getBookmark());

//       // Check if the start and end of the selection are at the very end
//       // of the input, since moveStart/moveEnd doesn't return what we want
//       // in those cases
//       endRange = el.createTextRange();
//       endRange.collapse(false);

//       if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
//         start = end = len;
//       } else {
//         start = -textInputRange.moveStart("character", -len);
//         start += normalizedValue.slice(0, start).split("\n").length - 1;

//         if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
//           end = len;
//         } else {
//           end = -textInputRange.moveEnd("character", -len);
//           end += normalizedValue.slice(0, end).split("\n").length - 1;
//         }
//       }
//     }
//   }

//   return {
//     start: start,
//     end: end
//   };
// }

