var render = function (theme, data, meta, require) {
    if (data.isLogged) {
        theme('simple', {
            body: [
                { partial: 'question', context: data.stream.question}
            ]
        });
    }
};
