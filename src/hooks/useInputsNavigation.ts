import { useEffect, useRef, RefObject } from "react";

// put parentContainer that contains inputs to navigate, (nested inputs allowed)

export const useInputsNavigation = (parentContainerRef: RefObject<HTMLElement>) => {
    const inputsRef = useRef<HTMLInputElement[] | null>(null)

		const processFocusChange = (newFocusElem: HTMLInputElement) => {
			newFocusElem.focus();
			if (newFocusElem.type === "text" || newFocusElem.type === "password") {
				setTimeout(() => 
					newFocusElem.setSelectionRange(newFocusElem.value.length, newFocusElem.value.length), 
				0)
			}
		}

    useEffect(() => {

				const onKeyDown = (e: KeyboardEvent) => {
					const curInput = e.target as HTMLInputElement;

					if (!inputsRef.current || !curInput)
						return;

      	  const curInputIndex = inputsRef.current.indexOf(curInput);
      	  if(e.key === "ArrowDown" && curInputIndex < (inputsRef.current as any).length - 1) {
						const nextInput = (inputsRef.current as any).at(curInputIndex + 1)  
						processFocusChange(nextInput);
      	  } 
					else if (e.key === "ArrowUp" && curInputIndex >= 0) {
						const prevInput = (inputsRef.current as any).at(curInputIndex - 1)  
						processFocusChange(prevInput);
      	  }
    		}

        if (!parentContainerRef.current)
            return 

        const inputs = parentContainerRef.current.querySelectorAll('input');

        inputs.forEach(input => {
            input?.addEventListener("keydown", onKeyDown);
        });

        inputsRef.current = Array.from(inputs);

        return (() => {
            inputs.forEach(input => {
                input?.removeEventListener("keydown", onKeyDown);
            });
        })
    }, [parentContainerRef])
}
