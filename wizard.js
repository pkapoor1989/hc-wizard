var _vwo_acc_id = 156239;
if (!_vwo_code.finished()) {
    clearTimeout(_vwo_settings_timer);
    _vwo_exp_ids = [], _vwo_exp = {};
    _vwo_exp_ids.push('4');
    _vwo_exp['4'] = {
        "version": 2,
        "clickmap": 1,
        "type": "VISUAL_AB",
        "status": "RUNNING",
        "pc_traffic": 100,
        "name": "Campaign 145",
        "urlRegex": "^http\\:\\\/\\\/pkapoor1989\\.github\\.io\\\/hc\\-wizard\\\/?(?:[\\?#].*)?$",
        "exclude_url": "",
        "multiple_domains": 0,
        "segment_code": "true",
        "sections": {
            "1": {
                "path": "",
                "variations": {
                    "1": "[]",
                    "2": "[{\"js\":\"var ctx=vwo_$(x);ctx.html(\\\"Demo new<br>\\\").css({\\\"background-color\\\":\\\"#000000\\\"});\",\"xpath\":\"BODY > DIV:first-child > DIV:first-child > DIV:first-child + DIV > DIV:first-child > DIV:first-child > H3:first-child\"}]"
                },
                "segment": {
                    "1": 1,
                    "2": 1
                }
            }
        },
        "combs": {
            "1": 0.5,
            "2": 0.5
        },
        "comb_n": {
            "1": "Control",
            "2": "Variation-1"
        },
        "goals": {
            "1": {
                "urlRegex": "^http\\:\\\/\\\/pkapoor\\\/?(?:[\\?#].*)?$",
                "type": "SEPARATE_PAGE"
            }
        }
    };
    var _vwo_style = document.getElementById('_vis_opt_path_hides'),
        _vwo_css = '{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}';
    var _vwo_text = 'BODY > DIV:first-child > DIV:first-child > DIV:first-child + DIV > DIV:first-child > DIV:first-child > H3:first-child' + _vwo_css;
    if (_vwo_style.styleSheet) {
        _vwo_style.styleSheet.cssText = _vwo_text;
    } else {
        var _vwo_textnode = document.createTextNode(_vwo_text);
        _vwo_style.appendChild(_vwo_textnode);
        _vwo_style.removeChild(_vwo_style.childNodes[0]);
    }
    var _vwo_cookieDomain = 'pkapoor1989.github.io',
        _vwo_uuid = '39A4AC2DE4DF81F6C5AA9E85BB4E7855',
        _vis_opt_file = _vwo_code.use_existing_jquery() ? 'vanj-62d012375c58cc977db0ae493cbed2a6.js' : 'va-62d012375c58cc977db0ae493cbed2a6.js',
        _vwo_library_timer = setTimeout('_vwo_code.finish()', _vwo_code.library_tolerance()),
        _vis_opt_lib = (typeof _vis_opt_lib == 'undefined') ? '//dev.visualwebsiteoptimizer.com/' + _vis_opt_file : _vis_opt_lib;
    _vwo_code.load(_vis_opt_lib);
}
