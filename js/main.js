(function() {
  var draw_plot, get_pay_amount, main, plot;

  get_pay_amount = function(rate, hour) {
    var alv, effective_wage, f, f_a, k, kv, lh, lh_yearly, netto, pv, rv, total, total_yearly, vals, y, z;
    total = hour * rate;
    rv = 0;
    lh = 0;
    kv = 0;
    pv = 0;
    alv = 0;
    k = 0.0945;
    if (total < 450) {
      rv = 0;
    } else if (total < 850) {
      f = 0.7605;
      f_a = f * 450 + ([850 / 400.0] - [450 / 400] * f) * (total - 450);
      rv = f_a * k;
    } else {
      rv = total * k;
    }
    total_yearly = total * 12;
    if (total_yearly < 8354) {
      lh_yearly = 0;
    } else if (total_yearly < 13469) {
      y = (total_yearly - 8354) / 10000.0;
      lh_yearly = (974.58 * y + 1400) * y;
    } else if (total_yearly < 52881) {
      z = (total_yearly - 13469) / 10000.0;
      lh_yearly = (228.74 * z + 2397) * z + 971;
    } else if (total_yearly < 250730) {
      lh_yearly = .42 * total_yearly - 8239;
    } else {
      lh_yearly = .45 * total_yearly - 15761;
    }
    lh = lh_yearly / 12.0;
    netto = total - rv - lh;
    effective_wage = netto * 1.0 / hour;
    return vals = [netto, netto + rv, netto + rv + lh, effective_wage];
  };

  plot = function(data) {
    var amount, datum, i, total_plot, total_plot_length, _i, _j, _len, _len1, _ref;
    total_plot_length = data[0].amounts.length;
    total_plot = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      datum = data[_i];
      _ref = datum.amounts;
      for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
        amount = _ref[i];
        total_plot[i] || (total_plot[i] = []);
        total_plot[i].push([datum.hour, amount]);
      }
    }
    return total_plot;
  };

  draw_plot = function(hourly_rate) {
    var data, hours_max, hours_min, hours_step, i, _i;
    hours_min = 0;
    hours_max = 80;
    hours_step = 2;
    data = [];
    for (i = _i = hours_min; hours_step > 0 ? _i <= hours_max : _i >= hours_max; i = _i += hours_step) {
      data.push({
        hour: i,
        amounts: get_pay_amount(hourly_rate, i)
      });
    }
    return plot(data);
  };

  main = function() {
    var total_plot;
    total_plot = [];
    [5, 10, 15, 20, 25, 30, 35, 40].map(function(x) {
      return total_plot.push(draw_plot(x)[3]);
    });
    return $.plot("#placeholder", total_plot);
  };

  $(document).ready(function() {
    return main();
  });

}).call(this);
