document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('global-loader');

    function showLoader() {
        if (loader) loader.classList.remove('hidden');
    }

    function hideLoader() {
        if (loader) loader.classList.add('hidden');
    }

    window.addEventListener('pageshow', hideLoader);

    document.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('no-loader')) {
            showLoader();
        }
    });

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return; // Ignore clicks that aren't on links

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        if (
            !href || 
            href.startsWith('#') || 
            href.startsWith('javascript:') || 
            target === '_blank' || 
            link.hasAttribute('download')
        ) {
            return;
        }

        showLoader();
    });
});