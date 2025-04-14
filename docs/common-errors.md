# Common Errors and Solutions

This document lists common errors encountered during the development of this project and their solutions.

## 1. Build Error: "Export default doesn't exist in target module" (Misleading)

*   **Symptom:** The Next.js build fails with an error like `Export default doesn't exist in target module ...` pointing to a specific import in a file (e.g., `src/app/projects/[slug]/page.tsx`), even though the imported component (e.g., `src/components/ui/interactive-bento-gallery.tsx`) clearly has a default export and the import path/alias seems correct. Cleaning the cache (`rm -rf .next`) and reinstalling dependencies (`rm -rf node_modules && npm install`) does not resolve the issue. The error message might also show strangely formatted import paths in the log (e.g., `"'components/ui/...'"`).
*   **Cause:** Invalid comment syntax (`{/* ... */}`) placed directly between JSX attributes within a component tag (in this case, within the `<video>` and `<Image>` tags in `src/components/ui/interactive-bento-gallery.tsx`). This invalid syntax can confuse the build process and lead to misleading errors about exports.
*   **Solution:** Carefully inspect the component mentioned in the error (or components imported by the file throwing the error) for any comments placed directly between JSX attributes. Remove these invalid comments. For example:

    ```jsx
    // INVALID
    <video
        ref={videoRef}
        {/* This comment is invalid here */}
        className="w-full h-full"
        // ...
    >

    // VALID
    <video
        ref={videoRef}
        // This comment is valid outside attributes
        className="w-full h-full"
        // ...
    >
