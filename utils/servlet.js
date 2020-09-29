module.exports = {
    responseData(params) {
        let ctx = params.ctx;
        ctx.response.status = (params.status || 200);
        ctx.body = {
            code: (params.code || 0),
            msg: (params.msg || ''),
            data: (params.data || {})
        }
    }
};