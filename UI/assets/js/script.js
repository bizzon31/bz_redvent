// Первичный расчёт
$(document).ready(function(){
    const arr_type_size = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
    
    updateForm()
    updateTable()
    
    // Расчёт площади сечения воздуховода
    function squarePipe(diametr){
        square = Math.PI * (( diametr_cut / 2 ) /1000 ) ** 2
        return ( square ).toFixed(3)
    }
    // Расчёт скорости потока воздуха в канале
    function speedAir(supply, square){
        speed = supply / ( 3600 * square )
        return ( parseFloat( speed )).toFixed(3)
    }
    // Обновление данных формы (пересчёт)
    function updateForm(){
        // Подача max
        supply = parseInt($('#supply')[0].value)
        // Подача mid
        supply_mid = parseInt($('#supply-2')[0].value)
        // Подача min
        supply_min = parseInt($('#supply-3')[0].value)

        diametr_cut = parseInt($('#diametr-cut')[0].value)
        square_cut = $('#square-cut')[0].value = squarePipe(diametr_cut)
        quantity_cut = parseInt($('#quantity-cut')[0].value)
        square_cut_amount = $('#square-cut-amount')[0].value = square_cut * quantity_cut

        // Скорость потока max     
        speed_air = $('#speed-air-cut')[0].value = speedAir(supply, square_cut) / quantity_cut
        // Скорость потока mid     
        speed_air_mid = $('#speed-air-cut-2')[0].value = speedAir(supply_mid, square_cut) / quantity_cut
        // Скорость потока min     
        speed_air_min = $('#speed-air-cut-3')[0].value = speedAir(supply_min, square_cut) / quantity_cut
    }
    // Обновление расхода в таблице
    function updateTblQ(){
        q_max = $('#supply')[0].value
        $('#tbl-max-q')[0].textContent = `q(max)=${q_max}`
        q_mid = $('#supply-2')[0].value
        $('#tbl-mid-q')[0].textContent = `q(mid)=${q_mid}`
        q_min = $('#supply-3')[0].value
        $('#tbl-min-q')[0].textContent = `q(min)=${q_min}`
    }
    // Обновление скоростей в таблице
    function updateTblSpeed(){
        q_max = $('#supply')[0].value
        q_mid = $('#supply-2')[0].value
        q_min = $('#supply-3')[0].value
        
        $('*[id*=row-max-v]').each(function(){
            s = $(this).siblings().filter('#row-square')[0].textContent
            v = q_max / ( s * 3600)
            this.textContent = v.toFixed(1)
            // console.log(v.toFixed(1))
        }) 
        
        $('*[id*=row-mid-v]').each(function(){
            s = $(this).siblings().filter('#row-square')[0].textContent
            v = q_mid / ( s * 3600)
            this.textContent = v.toFixed(1)
            // console.log(v.toFixed(1))
        })
        
        $('*[id*=row-min-v]').each(function(){
            s = $(this).siblings().filter('#row-square')[0].textContent
            v = q_min / ( s * 3600)
            this.textContent = v.toFixed(1)
            // console.log(v.toFixed(1))
        })
    }
    // Обновление размера в таблице
    function updateSizeDiff(){
        length_dif = $('#length-diffuser')[0].value
        $('#tbl-length')[0].innerText = `Данные на ( ${length_dif} мм ) ${length_dif / 1000 } м.п.`
    }
    // Обновление наименований в таблице  
    function updateTblName(){
        selected_value = $('#name-diffuser').val()
        size = 5
        $('*[id*=row-name]').each(function(){
            size = size + 5
            this.innerText = `${selected_value} ${size}`
            
        });
    }
    // Обновление площади щели диффузора
    function updateTblSquare(){
        a = $('#length-diffuser').val() / 1000
        
        $('*[id*=row-square]').each(function(){
            b = $(this).prev()[0].textContent /1000
            c = a * b
            this.innerText = c.toFixed(3)
        })
    }
    // Расчёт/Обновление потери довления для таблицы
    function updatelostPressure(){

        $('*[id*=row-max-p]').each(function(){
            a = $('#length-diffuser')[0].value
            b = $(this).siblings().filter('*[id*=row-width]')[0].textContent
            a = a / 1000
            b = b / 1000
            // Эквивалент диаметра
            d_ecv = (2 * a * b) / ( a + b )
            d_ecv = d_ecv.toFixed(4)
            // V – скорость воздуха (м/с)
            v = $(this).siblings().filter('*[id*=row-max-v]')[0].textContent
            // L – длина участка (м) [l]
            l = 0.02
            dlt_p = darciVaisbach(v,d_ecv) 
            this.innerText = dlt_p.toFixed(2)
            // console.log( dlt_p.toFixed(2))
        }) 
        $('*[id*=row-mid-p]').each(function(){
            a = $('#length-diffuser')[0].value
            b = $(this).siblings().filter('*[id*=row-width]')[0].textContent
            a = a / 1000
            b = b / 1000
            // Эквивалент диаметра
            d_ecv = (2 * a * b) / ( a + b )
            d_ecv = d_ecv.toFixed(4)
            // V – скорость воздуха (м/с)
            v = $(this).siblings().filter('*[id*=row-mid-v]')[0].textContent
            // L – длина участка (м) [l]
            l = 0.02
            dlt_p = darciVaisbach(v,d_ecv) 
            this.innerText = dlt_p.toFixed(2)
            // console.log( dlt_p.toFixed(2))
        }) 
        $('*[id*=row-min-p]').each(function(){
            a = $('#length-diffuser')[0].value
            b = $(this).siblings().filter('*[id*=row-width]')[0].textContent
            a = a / 1000
            b = b / 1000
            // Эквивалент диаметра
            d_ecv = (2 * a * b) / ( a + b )
            d_ecv = d_ecv.toFixed(4)
            // V – скорость воздуха (м/с)
            v = $(this).siblings().filter('*[id*=row-min-v]')[0].textContent
            // L – длина участка (м) [l]
            l = 0.02
            dlt_p = darciVaisbach(v,d_ecv) 
            this.innerText = dlt_p.toFixed(2)
            // console.log( dlt_p.toFixed(2))
        }) 
    }
    // Формула Дарси-Вейсбаха
    function darciVaisbach(v,d_ecv){
        lamd = 0.3 // λ – коэффициент трения = 0,05
        ro = 1.2 // ρ – плотность воздуха (~1,2 кг/м³)
        l = 0.1 // 
        // P - потери довления   [dlt_p]
        dlt_p = lamd * ( l / d_ecv ) * (( ro * v ** 2 ) / 2)
        return dlt_p
    }
    // Расчёт звуковых характеристик для таблицы
    function soundChartbl(){
        $('*[id*=row-max-l]').each(function(){
            v = $(this).siblings().filter('*[id*=row-max-v]')[0].textContent
            s = $(this).siblings().filter('*[id*=row-square]')[0].textContent
            l_p = 30 + 25 * Math.log10(v) + Math.log10(s)
            
            this.textContent = l_p.toFixed(0) - 5
            // console.log(l_p)
        })
        $('*[id*=row-mid-l]').each(function(){
            v = $(this).siblings().filter('*[id*=row-mid-v]')[0].textContent
            s = $(this).siblings().filter('*[id*=row-square]')[0].textContent
            l_p = 30 + 25 * Math.log10(v) + Math.log10(s)
            
            this.textContent = l_p.toFixed(0) - 5 
            // console.log(l_p)
        })
        $('*[id*=row-min-l]').each(function(){
            v = $(this).siblings().filter('*[id*=row-min-v]')[0].textContent
            s = $(this).siblings().filter('*[id*=row-square]')[0].textContent
            l_p = 30 + 25 * Math.log10(v) + Math.log10(s)
            
            this.textContent = l_p.toFixed(0) - 5
            // console.log(l_p)
        })
    }
    // Расчёт длины струи для таблицы
    function lengthJetTbl(){
        
        $('*[id*=row-max-jet-02]').each(function(){
            
            v_max = $(this).siblings().filter('*[id*=row-max-v]')[0].textContent
            width_dif = $(this).siblings().filter('*[id*=row-width]')[0].textContent / 1000
            
            arr_args = formulLengthJet(v_max, width_dif)
            
            this.textContent = arr_args[1].toFixed(2)
            $(this).siblings().filter('*[id*=row-max-jet-05]')[0].textContent = arr_args[0].toFixed(2)
            
            // console.log(`v_max: ${v_max} | width_dif: ${width_dif} | l 0,2: ${arr_args[0].toFixed(2)} | l 0,5: ${arr_args[1].toFixed(2)} `)
        })
        $('*[id*=row-mid-jet-02]').each(function(){
            
            v_mid = $(this).siblings().filter('*[id*=row-mid-v]')[0].textContent
            width_dif = $(this).siblings().filter('*[id*=row-width]')[0].textContent / 1000
            
            arr_args = formulLengthJet(v_mid, width_dif)
            
            this.textContent = arr_args[1].toFixed(2)
            $(this).siblings().filter('*[id*=row-mid-jet-05]')[0].textContent = arr_args[0].toFixed(2)
            
            // console.log(`v_mid: ${v_max} | width_dif: ${width_dif} | l 0,2: ${arr_args[0].toFixed(2)} | l 0,5: ${arr_args[1].toFixed(2)} `)
        })
        $('*[id*=row-min-jet-02]').each(function(){
            
            v_min = $(this).siblings().filter('*[id*=row-min-v]')[0].textContent
            width_dif = $(this).siblings().filter('*[id*=row-width]')[0].textContent / 1000
            
            arr_args = formulLengthJet(v_min, width_dif)
            
            this.textContent = arr_args[1].toFixed(2)
            $(this).siblings().filter('*[id*=row-min-jet-05]')[0].textContent = arr_args[0].toFixed(2)
            
            // console.log(`v_min: ${v_max} | width_dif: ${width_dif} | l 0,2: ${arr_args[0].toFixed(2)} | l 0,5: ${arr_args[1].toFixed(2)} `)
        })
    }
    // Формула расчёта длины струи, где vx =0,5 м/с и vx =0,2 м/с.
    function formulLengthJet(v, width_dif){
        // Начальная скорость v0 (м/с), [v]
        // Ширина щели b0 (м) [width_dif]
        // Требуемое расстояние, где vx =0,5 м/с и vx =0,2 м/с.
        vx1 = 0.5
        vx2 = 0.2
        
        x1 = width_dif * (((( v * 1) ** 2) / vx1 ) - 0.41 )
        x2 = width_dif * (((( v * 1) ** 2) / vx2 ) - 0.41 )
        
        arr_args = [x1, x2]
        return arr_args
        
    }
    // Анализ расчётов
    function analizTbl(){
        // по скорости и шуму
        $('*[id*=row-max-v]').each(function(){
            v = this.textContent

            if(v <= 4 && v >= 2){
                $(this).addClass('text-danger') 
            }else{
                $(this).removeClass('text-danger')
                $(this).addClass('text-info')
            }
        })
        $('*[id*=row-mid-v]').each(function(){
            v = this.textContent
            if(v <= 3 && v >= 1.5){
                $(this).addClass('text-danger') 
            }else{
                $(this).removeClass('text-danger')
                $(this).addClass('text-info')
            }
        })
        $('*[id*=row-min-v]').each(function(){
            v = this.textContent
            if(v <= 2 && v >= 1){
                $(this).addClass('text-danger') 
            }else{
                $(this).removeClass('text-danger')
                $(this).addClass('text-info')
            }
        })
        // по шуму
        $('*[id*=row-max-l]').each(function(){
            l = this.textContent
            if(l <= 40 && l >= 30){
                $(this).addClass('text-danger') 
            }else{
                $(this).removeClass('text-danger')
            }
        })
        $('*[id*=row-mid-l]').each(function(){
            l = this.textContent
            if(l <= 35 && l >= 25){
                $(this).addClass('text-danger') 
            }else{
                $(this).removeClass('text-danger')
            }
        })
        $('*[id*=row-min-l]').each(function(){
            l = this.textContent
            if(l <= 30 && l >= 20){
                $(this).addClass('text-danger') 
            }else{
                $(this).removeClass('text-danger')
            }
        })
    }
    // Выделение, в таблице, соответствующих диффузоров, на основе анализа данных
    function selectDiffTbl(){
        $('*[id*=row-num]').each(function(){
            n = 0
            $(this).siblings().each(function(){
                str = 'text-danger'
                arr_cls = $(this).hasClass(str)
                if(arr_cls){
                    n = n + 1
                }
            })
            
            console.log(n)
            if(n == 6){
                $(this).siblings().each(function(){
                    console.log($(this))
                    $(this).addClass('table-active')
                })
            }else{
                $(this).siblings().each(function(){
                    $(this).removeClass('table-active')
                })
            }
        })
    }
    // Обновление данных в таблице
    function updateTable(){
        updateTblQ()
        updateSizeDiff()
        updateTblName()
        updateTblSquare()
        updateTblSpeed()
        updatelostPressure()
        soundChartbl()
        lengthJetTbl()
        analizTbl()
        selectDiffTbl()
    }
    
    // Событие на изменения в поле диаметр
    $('#diametr-cut').on('input', function(){
        updateForm()
        // console.log($(this).val())
    })
    // Событие на изменения в поле длина диффузора
    $('#length-diffuser').on('input', function(){
        updateTable()
    })
    // Сахранить как пдф находится на стадии разработки    
    $('#click-button').click(function(){
        var element = document.getElementById('target');
        var opt = {
          // margin:       1,
          filename:     'myfile.pdf',
          image:        { type: 'png', quality: 1 },
          // html2canvas:  { scale: 2 },
          // jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
        html2pdf(element, opt);
    });
    // Событие на выбор модели диффузора
    $('#name-diffuser').on('change', function() {
        updateTblName()
    })
})

// Связь потерь давления с расходом воздуха определяется по формуле Дарси-Вейсбаха
//     function lostPressure(){
//         lamda = 1.17
//         l = 0.02
        
//         ro = 1.2
//         v = 1
        
//         a = 0.04
//         b = 1
        
//         d = (2 * a * b) / (a + b)
//         console.log(d)
        
//         delta_p = lamda * (l / d) * ((ro * v ** 2) / 2)
//         console.log((delta_p).toFixed(3))
//         v = 2
//         delta_p = lamda * (l / d) * ((ro * v ** 2) / 2)
//         console.log((delta_p).toFixed(3))
//         v = 3
//         delta_p = lamda * (l / d) * ((ro * v ** 2) / 2)
//         console.log((delta_p).toFixed(3))
//     }
    // lostPressure()
