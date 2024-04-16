function copyToClipboard(text, key) {
    navigator.clipboard.writeText(text).then(() => {
        $('button[data-key="'+key+'"]').html('✔️');
        setTimeout(function() {
            $('button[data-key="'+key+'"]').html('📋');
        }, 2500)
    }).catch(() => {
        //
    });
}

function renderData(dataArray) {
    let html = '';
    if (typeof dataArray === "undefined" || dataArray.length < 1) {
        return false;
    }
    let x = 1;
    dataArray.forEach(function(element) {
        if ( element !== "" ) {
            html += '<div class="input-group">';
            html += '<input type="text" class="form-control" placeholder="Key" readonly value="'+element+'" />';
            html += '<div class="input-group-btn">';
            html += '<button class="btn btn-default" onclick="copyToClipboard(\'' + element + '\', \'' + x + '\')" data-key="'+x+'">';
            html += '📋';
            html += '</button>';
            html += '</div>';
            html += '</div>';
            x++;
        }
    });
    let loadMore = '<div class="clearfix"></div>';
    loadMore += '<a class="btn btn-warning btn-block" href="https://raw.githubusercontent.com/ircfspace/warpkey/main/plus/full" dir="rtl" target="_blank">';
    loadMore += 'کلیدهای بیشتر ...';
    loadMore += '</a>';
    $('#setContent').html(html+loadMore);
}

window.addEventListener('load', function() {
    const cachedData = localStorage.getItem('warpData');
    const cachedTime = localStorage.getItem('warpDataTime');
    if (cachedData !== "undefined" && cachedTime !== "undefined" && (Date.now() - cachedTime < 15 * 60 * 1000)) {
        renderData(cachedData);
    } else {
        fetch('https://raw.githubusercontent.com/ircfspace/warpkey/main/plus/lite')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const dataArray = data.split('\n');
                if (dataArray.length > 0) {
                    renderData(dataArray);
                }
                else {
                    renderData(cachedData);
                }
            })
            .catch(error => {
                renderData(cachedData);
            });
    }
});
