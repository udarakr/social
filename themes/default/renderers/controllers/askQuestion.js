var render = function (theme, data, meta, require) {
    if (data.isLogged) {
        theme('simple', {
            body: [
                { partial: 'question-input', context: data.input_param}
            ]
        });
    }
};
