import { RefObject, useEffect } from 'react';

// Custom hook to detect clicks outside a specified element
export function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, callback: () => void): void {
    useEffect(() => {
        // Function to call when click is detected outside
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}
