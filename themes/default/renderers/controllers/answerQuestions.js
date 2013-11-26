var render = function (theme, data, meta, require) {
    data.stream.isLogged = data.isLogged;
    if (data.isLogged) {
        theme('simple', {
            body: [
                { partial: 'list-questions', context: data.stream}
            ]
        });
    }
};
