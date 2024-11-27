		  $( '#feedback' ).ready(function() {
			var phoneInput = document.querySelector('#phone')
			phoneInput.addEventListener('keydown', function(event) {
			   if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
			    var mask = '+7 (111) 111-11-11'; // Задаем маску

			    if (/[0-9\+\ \-\(\)]/.test(event.key)) {
			        // Здесь начинаем сравнивать this.value и mask
			        // к примеру опять же
			        var currentString = this.value;
			        var currentLength = currentString.length;
			        if (/[0-9]/.test(event.key)) {
			            if (mask[currentLength] == '1') {
			                this.value = currentString + event.key;
			            } else {
			                for (var i=currentLength; i<mask.length; i++) {
			                if (mask[i] == '1') {
			                    this.value = currentString + event.key;
			                    break;
			                }
			                currentString += mask[i];
			                }
			            }
			        }
			    }
			})
			});

			$('#feedback').on("submit", function(e) {
	    e.preventDefault();
	    var form = $(this),
	        name = form.find('#name'),
	        tel = form.find('input[type="tel"]'),
	        agree = form.find('#agree'),
	        btn = form.find(".btn");
	    //проверка на наличие букв в имени в начале
	    let regName = /^[а-яА-ЯёЁa-zA-Z]+[0-9-_]*[а-яА-ЯёЁa-zA-Z]*$/g;

	    if (name.val().length < 2) {
	        name.next().removeClass('hidden').text('Мало символов в имени');
	        return false;
	    } else name.next().addClass('hidden').text('');
	    if (!regName.test(name.val())) {
	        name.next().removeClass('hidden').text('В начале имени должны быть буквы');
	        return false;
	    } else {
	        name.next().addClass('hidden').text('');
	    }

	    if (tel.val().length < 14) {
	        tel.next().removeClass('hidden').text('Не менее 11 цифр');
	        return false;
	    } else {
	        tel.next().addClass('hidden').text('');
	    }

	    if (agree.prop("checked")) {
	    	agree.next().addClass('hidden').text('');
	    } else {
			agree.next().removeClass('hidden').text('Поставьте галочьку');
	        return false;
	    }

	    //отключаем кнопку, чтобы не было повторного клика по ней, пока отравляется наш скрипт
	    btn.attr('disabled', true).addClass('disabled');
	    var data = form.serialize();
	    $.ajax({
	        url: './php/ajaxCall.php',
	        type: 'POST',
	        data: data,
	    }).done(function(data) {
	        //записываем код, который сработает в случае успешной отправки формы на сервер
	        console.log("Ok! " + data);
	        $('.close').click();
	        $('#messageModal').find('p.date').html('<p>Ваша заявка получена ' + (new Date().toLocaleString()) + '</p>')
	        $('#messageModal').modal('show');
	        form.find('input').val('');
	        btn.removeAttr('disabled').removeClass('disabled'); // делаем кнопку отправки формы снова доступной
	    }).fail(function() {
	        //здесь размещаем код, который будет выводится в случае ошибки с отправкой формы или письма
	        btn.removeClass('disabled');
	        form.append('<div>Извините, с отправкой письма произошла ошибка.<br>Попробуйте еще раз</div>');
	        btn.removeAttr('disabled').removeClass('disabled'); // делаем кнопку отправки формы снова доступной
	        console.log("Error from mail!!!" + data);

	    });
		});
