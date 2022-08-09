module.exports = (options) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${options.name}</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/themes/vue.css" />
  </head>
  
  <body>
    <div id="app"></div>
    <script>
      window.$docsify = ${JSON.stringify(options)};
    </script>

    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>

    <!-- plantuml -->
    <script src="//unpkg.com/docsify-plantuml/dist/docsify-plantuml.min.js"></script>

    <!-- zoom image -->
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>

    <!-- search -->
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>

    <!-- mermaid -->
    <script src="//unpkg.com/mermaid/dist/mermaid.js"></script>
    <script src="//unpkg.com/docsify-mermaid@latest/dist/docsify-mermaid.js"></script>
    <script>mermaid.initialize({ startOnLoad: true });</script>
  </body>
</html>`;
};
