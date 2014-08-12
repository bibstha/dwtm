# Return [ [list of ]]
get_pay_amount = (rate, hour) ->
  total = hour * rate 

  rv = 0
  lh = 0
  kv = 0
  pv = 0
  alv = 0

  # RV
  k = 0.0945
  if total < 450
    rv = 0
  else if total < 850
    f = 0.7605
    f_a = f * 450 + ( [850 / 400.0] - [450/400]*f ) * (total - 450)
    rv = f_a * k
  else
    rv = total * k

  # Lohnsteuer
  total_yearly = total * 12
  if total_yearly < 8354
    lh_yearly = 0
  else if total_yearly < 13469
    y = (total_yearly - 8354) / 10000.0
    lh_yearly = (974.58 * y + 1400) * y
  else if total_yearly < 52881
    z = (total_yearly - 13469) / 10000.0
    lh_yearly = (228.74 * z + 2397) * z + 971
  else if total_yearly < 250730
    lh_yearly = (.42 * total_yearly - 8239)
  else
    lh_yearly = (.45 * total_yearly - 15761)

  lh = lh_yearly / 12.0

  netto = total - rv - lh

  effective_wage = netto * 1.0 / hour

  vals = [netto, netto + rv, netto + rv + lh, effective_wage]
  # dummy.map (x) ->
  #   x * k

plot = (data, placeholder) ->
  total_plot_length = data[0].amounts.length
  total_plot = []

  for datum in data
    for amount, i in datum.amounts
      total_plot[i] ||= []
      total_plot[i].push [datum.hour, amount]

  $.plot(placeholder, [
    # { label: "netto", data: total_plot[0] },
    # { label: "rv", data: total_plot[1] },
    # { label: "lh", data: total_plot[2] },
    { label: "ew", data: total_plot[3], yaxis: 2 },
  ])
  

draw_plot = (hourly_rate, placeholder) ->

  hours_min = 0
  hours_max = 80
  hours_step = 2

  data = []
  for i in [hours_min..hours_max] by hours_step
    data.push {hour: i, amounts: get_pay_amount(hourly_rate, i)}
  
  plot(data, placeholder)

main = ->
  draw_plot(25, "#placeholder_1")
  draw_plot(33, "#placeholder_2")

$(document).ready ->
  main()