module.exports = function () {
    return {
      name: 'protected-routes',
      injectHtmlTags: () => {
        return {
          headTags: [
            {
              tagName: 'script',
              innerHTML: `
                function checkAccess() {
                  const protectedRoutes = ['/blog', '/docs'];
                  const currentPath = window.location.pathname;
  
                  for (const route of protectedRoutes) {
                    if (currentPath.startsWith(route)) {
                      const accessKey = localStorage.getItem('key');
                      if (accessKey !== 'true') {
                        window.location.href = '/AccessDenied';
                      }
                    }
                  }
                }
  
                document.addEventListener('DOMContentLoaded', checkAccess);
                window.addEventListener('popstate', checkAccess);
              `,
            },
          ],
        };
      },
    };
  };
  