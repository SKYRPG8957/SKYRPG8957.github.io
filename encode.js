function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

var htmlContent = '<h1>Hello, World!</h1><script>console.log("JavaScript is running!");alert("Hello from JavaScript!");</script>';
console.log(toBase64(htmlContent));
