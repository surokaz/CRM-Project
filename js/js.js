"use strict";
$(function(){
	if($('.nav').length>0){
		$('.nav .nav_trigger').click(function(){
			$(this).parent().toggleClass('opened');
			$(this).parent().children('ul').children('li').children('a').children('span').toggle(200);
			
		})
	}
	$('.dropdowns .card-body button.filter-button').click(function(e){
		$(this).toggleClass('selected')
	});

	$('.item-shah button.filter-button').click(function(e){
		if($(this).hasClass('grivna')) {
			$(this).addClass('selected');
			$(this).next().removeClass('selected');	
		} else {
			$(this).addClass('selected');
			$(this).prev().removeClass('selected');	
			
		}
		
		
	});
	
	$('.start_page .header button').click(function(){
		if($(this).hasClass('collapsed')){
			$(this).parent().children('button').each(function(){
				if($(this).hasClass('collapsed') || $($(this).data('target')).hasClass('collapsing')){
					if($($(this).data('target')).hasClass('collapsing')){console.log('a')}
				}else{
					$($(this).data('target')).collapse('hide')
				}
			})
		}
	});
	$('.selectric').selectric({
		optionsItemBuilder: function(itemData) {
			return itemData.value.length ?
				'<span class="status status-' + itemData.value +  '"></span>' + itemData.text :
					itemData.text;
		  },
		  labelBuilder: function(currItem) {
			return currItem.value.length ?
			'<span class="status status-' + currItem.value +  '"></span>' + currItem.text :
			currItem.text;
		  }
	});
	$('.select-site').selectric({});

	$('[data-fancybox="gallery"]').fancybox({
		// Options will go here
	});
	$('.remove-file-gallery-button').click(function(e){
		e.preventDefault();
	});
	if ($('body').hasClass('settings')) {
		$('.datepicker').datepicker({
		locale: 'ru'
	});
	}
	

	$('.commentary-lead').popover({
		placement: 'auto',
		trigger: 'hover'
	});

	//Спрятать выполненные задачи	
	function hideTaskExecuted() {
		var allTask = $('.list-task input:checkbox');
		allTask.each(function(){
			if ($(this).prop('checked')) {
				
				$(this).parent().parent().parent().parent().hide();
				var ss = $(this).parent().next().attr('href');
				$(this).parent().next().children('.title-task').addClass('task-through'); //Вызов при старте
			} 
		});
		
	}
	hideTaskExecuted();
	//Показать все задачи
	function showAllTask(allTaskControl) {
		var allTask = allTaskControl.parent().parent().parent().find('.list-task input:checkbox');
			allTask.each(function(){
				$(this).parent().parent().parent().parent().show();
				
			});
			
	}
	//Спрятать показать задачи при запуске
	function firstStartAlltask() {
		var allTaskFirst = $('.all-task-input');
		allTaskFirst.each(function(){

			if($(this).prop('checked')) {

				showAllTask($(this));
			} else {
				hideTaskExecuted();
			}
		});
		
	}

	firstStartAlltask();
	//Изменение кнопки  все задачи
	$('.all-task-input').change(function(){
		var allTaskControl = $(this);
				
		if($(this).prop('checked')) {
		
			showAllTask(allTaskControl);

			$('.task-description').collapse('hide');

		} else {

			hideTaskExecuted();
			$('.task-description').collapse('hide');
		}

	});
	//Закрытие/открытие задачи
	$('.task-input').change(function(){
		var ts = $(this).closest('.task-block').find('.all-task-input');
		
		if(ts.prop('checked')) {
			showAllTask(ts);
			$(this).parent().next().children('.title-task').addClass('task-through');
			
		} else {
			hideTaskExecuted();
			
		}
		if ($(this).prop('checked')) {
			$(this).parent().next().children('.title-task').addClass('task-through');
		} else {
			$(this).parent().next().children('.title-task').removeClass('task-through');
		}
	});

//Кнопка редактирования задачи
	$('.task-button-element').click(function() {
		var title_task = $(this).parent().parent().prev().find('.title-task').text();
		var descr_task = $(this).parent().next().children('p').text();
		var file_task =  $(this).parent().next().find('.row-file-task');
		$('#edit-task-title').val(title_task);
		$('#edit-task-descr').text(descr_task);
		$('#modal-edit-task form').append(file_task);
		
	});
//Кнопка удаления файла из задачи

	$('.remove-file-task-button').click(function(){
		$('#modal-remove-file-task').modal('show');
		$('#file-removing').val();
	});
//Кнопка "Да" в модалке удалить файл
	$('#modal-remove-file-task-button').click(function(){
		$('#modal-remove-file-task').modal('hide');
	});
	
//Добавить лида кнопка 

	$('.button-added-lead').click(function(){
		$('#modal-add-lead').modal('show');
	});



//Предпросмотр фотографии при добавлении в задачу
function previewFile() {
  var preview = document.querySelector('.user-form img');
  var file    = document.querySelector('#photo-modal-add-lead').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
	preview.src = reader.result;
  }

  if (file) {
	reader.readAsDataURL(file);
  } else {
	preview.src = "";
  }
}

$("#photo-modal-add-lead").change(function(){
   previewFile();
});

//Скролл истории 
$('.create_setup_history').mCustomScrollbar({
	theme:'rounded-dark',
	scrollbarPosition: "inside",
	autoHideScrollbar:false,
	scrollButtons:{enable: true },
	scrollTo: "right"


});
$('.modal-parametrs-unit').on('shown.bs.modal', function () {
	  $('.create_setup_history').mCustomScrollbar({
		theme:'rounded-dark',
		scrollbarPosition: "inside",
		autoHideScrollbar:false,
		scrollButtons:{enable: true },
		scrollTo: "right"


	});
});
// ------------Создание Застройщика------------
$('#create-builder-form').submit(function(e){
	e.preventDefault();
	var count; //Номер застройщика
	var name = $('#name-builder-add').val(); //Название застройщика
	var count_builder = $('#builder-select option').length - 1; //Количество имеющихся
	count_builder++;
	count = count_builder;
	$('#builder-select').append('<option value="builder-single-' + count + '">'+	 name +'</option>');

	
});
//Закрытие по кнопке отмена
$('.close-create-builder').click(function(e){
	e.preventDefault();
	$('#create_builder').collapse('hide');
});
// ------------Создание проекта------------
	
	//Обновляем select в форме добавить проект по кнопке добавить проект
	$('#create_project').on('show.bs.collapse', function () {
		var option_add;
		var count_item = 1;
		var count_b = $('.row-all-builders > .col-4 > div');
		count_b.each(function(){
			var id = $(this).find('a').attr('id');
			var text = $(this).find('a .name-builder').text();
			if (count_item == 1) {
				option_add = '<option selected disabled>Выбрать застройщика</option>' +
				'<option value="'+ id +'">'+ text +'</option>';
			} else {
				option_add += '<option value="'+ id +'">'+ text +'</option>';
			}
			count_item++;
			$('#builder-select-add').html(option_add);
			
	  })
	});
	//Отслеживаем Количество корпусов и вставляем нужное

	$('#corpus-project-add').on('input keyup', function() {
		var z = $('#corpus-project-add').val();
		console.log(z.length);
		if ( z != 1 && z != 0 && z.length != 0  && z < 15 ) {
			$('.row-count-entrance .form-group').remove();
			for (var i = 0; i < z; i++) {
				var entr = i + 1;
				$('.row-count-entrance').append('<div class="form-group">' +
					'<label class="entrance-project-label" for="entrance-project-add-'+ entr +'">Корпус '+ entr +'</label>' +
					'<input required="required" type="text" class="form-control entrance-project" id="entrance-project-add-'+ entr +'"></div>');
				
			}
		} else {
			$('.row-count-entrance .form-group').remove();
			$('.row-count-entrance').append('<div class="form-group">' +
				'<label class="entrance-project-label" for="entrance-project-add-1">Корпус 1</label>' +
				'<input required="required" type="text" class="form-control entrance-project" id="entrance-project-add-1"></div>');
		}

	});
	$('#add-projec-form').submit(function(e){
		e.preventDefault();
		var nameProject = $('#name-project-add').val();
		var nameBuilder = $('#builder-select-add option:selected').html();
		var nameBuilderId = $('#builder-select-add option:selected').val();
		var countKorpus = $('#corpus-project-add').val();
		var parentAccordId = $('#' + nameBuilderId).next().children().attr('id');
		var adress = $('#addres-project-add').val();
		var countProjects = $('#' + nameBuilderId).next().children().children().length;
		var nextProjectNum = countProjects + 1;
		
		var corpusEntranceCount = {};
		for (var i = 1; i <= countKorpus; i++) {
			corpusEntranceCount[ 'corp-' + i ] = $('#entrance-project-add-' + i ).val();

		}
		
		var countKorpusOption = '';
		var entranceOption = '';
		var count = 0;
		for (var key in corpusEntranceCount ) {
			count++;
			var valueKorpus = nameBuilderId +'-proj' + nextProjectNum + '-'+ key;
			countKorpusOption +='<option data-entrance="'+ corpusEntranceCount[ key ] +'" value="' + valueKorpus +'">' + 'Корпус ' + count +'</option>';
			for (var i = 1; i <= corpusEntranceCount[ key]; i++ ) {
					
					entranceOption +='<option data-korpus="' + valueKorpus + '" value="' + i + '">' + 'Подъезд ' + i + '</option>';
				
			}

		}
		
		
		$('#' + nameBuilderId).next().children().append('');

		

	});
	//Редактирование select с корпусами и добавление

		$('.button-element-edit').click(function(){
			var s = $(this).closest('.building');
			s.find('.select-korpus-project').hide();
			s.find('.wrap-input-control-element').show();

			
		});
		//Кнопка сохранить input редактирования и удаления
		$('.btn-input-control-save').click(function(){
			var s = $(this).closest('.building');
			s.find('.select-korpus-project').show();
			s.find('.wrap-input-control-element').hide();
		});
		//Кнопка удалить input редактирования и удаления
		$('.btn-input-control-dismis').click(function(){
			var s = $(this).closest('.building');
			s.find('.select-korpus-project').show();
			s.find('.wrap-input-control-element').hide();
		});
	
		//Закрытие по кнопке отмена создания проекта по кнопке отмена
		$('.close-create-project').click(function(e){
			e.preventDefault();
			$('#create_project').collapse('hide');
		});
	//Редактирование характеристик проекта		
		$('.button-edit-character-project').click(function(){
			var s = $(this).closest('.project-params-line');
			s.find('.control-table').hide();
			s.find('div:nth-child(2)').hide();
			s.find('.wrap-input-control-element').show();
		});
		$('.project-params-line .btn-input-control-dismis').click(function(){
			var s = $(this).closest('.project-params-line');
					s.find('.control-table').show();
					s.find('div:nth-child(2)').show();
					s.find('.wrap-input-control-element').hide();
		});
		$('.project-params-line .btn-input-control-save').click(function(){
			var s = $(this).closest('.project-params-line');
					s.find('.control-table').show();
					s.find('div:nth-child(2)').show();
					s.find('.wrap-input-control-element').hide();
		});
	//Дополнительные  характеристики проекта
	$('.project-params-info-dynamic .button-params-dynamic-add').click(function(){
		$('.project-params-info-dynamic .line-control-dynamic').show();
	});

	$('.project-params-info-dynamic .line-control-dynamic .btn-input-control-save').click(function(){
		var t = $('.project-params-info-dynamic').children();
		var textAttr =	t.find('.input-add-attr-name').val();
		var valAttr = t.find('.input-add-attr-value').val();
		var countline = $('.project-params-info-dynamic .project-params-line').length;
		var shabl =  shablonDopCharacterProject(countline, textAttr, valAttr);
		$('.project-params-info-dynamic').append(shabl);
		t.find('.input-add-attr-name').val('');
		t.find('.input-add-attr-value').val('');
		controlDopAttr();
	});

	$('.project-params-info-dynamic .line-control-dynamic .btn-input-control-dismis').click(function(){
		var t = $('.project-params-info-dynamic').children();
		t.find('.input-add-attr-name').val('');
		t.find('.input-add-attr-value').val('');
		$('.project-params-info-dynamic .line-control-dynamic').hide();
	});

	function shablonDopCharacterProject(numAttr, nameAttr, valueAttr) {
		numAttr = numAttr + 1;
		var shbl = '<div class="project-params-line project-params-attr-'+ numAttr +'"><div>'+nameAttr +'</div><div>'+ valueAttr +'</div>'+
		'<div class="control-table">'+
			'<button type="button" class="task-button-element button-element-edit"  title="Редактировать"><i class="fas fa-pencil-alt"></i></button>'+
			'<button type="button" title="Удалить" class="task-button-element remove-file-task-button"><i class="fas fa-trash-alt"></i></button></div>'+
			'<div class="wrap-input-control-element"><input type="text" placeholder="Название характеристики" class="input-edit-option">'+
			'<input type="text" placeholder="Значение характеристики" class="input-edit-option">'+
			'<button type="button" class="btn btn-primary btn-sm btn-input-control-save">Сохранить</button>'+
			'<button type="button" class="btn btn-secondary btn-sm btn-input-control-dismis">Отменить</button></div></div>';
		return shbl
	}
	function controlDopAttr() {
		$('.project-params-info-dynamic .button-element-edit').click(function(){
			var s = $(this).closest('.project-params-line');
			s.find('.control-table').hide();
			s.find('div:nth-child(2)').hide();
			s.find('.wrap-input-control-element').show();
		});
		$('.project-params-info-dynamic .remove-file-task-button').click(function(){
			$('#modal-remove-file-task').modal('show');
		});
		$('.project-params-info-dynamic .project-params-line .btn-input-control-save').click(function(){
			var s = $(this).closest('.wrap-input-control-element');
			var m = $(this).closest('.project-params-line');
			s.hide();
			s.find('.wrap-input-control-element').hide();
			m.find('div:nth-child(2)').show();
			s.prev('.control-table').show();
		});
		$('.project-params-info-dynamic .project-params-line .btn-input-control-dismis').click(function(){
			var s = $(this).closest('.wrap-input-control-element');
			var m = $(this).closest('.project-params-line');
			s.hide();
			s.find('.wrap-input-control-element').hide();
			m.find('div:nth-child(2)').show();
			s.prev('.control-table').show();
		});
	}
// ----Редактирование статусов в settings
$('.current-status-settings .element-edit-status').click(function(){
	var s = $(this).closest('li');
	s.children('.status-settings').hide();
	s.children('.div-control-status').hide();
	s.children('.wrap-input-control-element ').show();
	s.addClass('edit');
});
$('.current-status-settings .btn-input-control-save').click(function(){
	var s = $(this).closest('li');
	s.children('.status-settings').show();
	s.children('.div-control-status').show();
	s.children('.wrap-input-control-element ').hide();
	s.removeClass('edit');
});
$('.current-status-settings .btn-input-control-dismis').click(function(){
	var s = $(this).closest('li');
	s.children('.status-settings').show();
	s.children('.div-control-status').show();
	s.children('.wrap-input-control-element ').hide();
	s.removeClass('edit');
});

// ------------Создание шахматки------------
// Статусы шахматки 
	// <span class="status-shah-1">Есть</span>
	// <span class="status-shah-2">Черновик</span>
	// <span class="status-shah-3">Нет</span>


//Сохраняем значение Проекта в localstorage

$('.create-new-build').click(function(e){ 
	// e.preventDefault();
	var tem = $(this).closest('.collapse').prev().children().text();
	localStorage.setItem('NameProject', tem)
	console.log(tem);
});
//Берем значение проекта из localstorage
if ( $('body').hasClass('create-shahmat-page') ) {
	var t = localStorage.getItem('NameProject');
	$('h2.title-house').text(t);

}

let floorCreate; // Количество этажей
let unitCreate; //Количество квартир на этаже

$('#numFloorCreator').change(function(){
	var f = $('#numFloorCreator').val();
	if ( f != 0 && f.length !=0 ) {
		floorCreate = +f;
	}
});

$('#numtUnitsCreator').change(function(){
	var u = $('#numtUnitsCreator').val();
	if ( u != 0 && u.length !=0 ) {
		unitCreate = +u;
	}
});

// f - кол-во этажей 
// u - кол-во квартир
// data-unit -- количество квартир на этаже
let shah ='';
function countShahItem (f, u) {
	if ( f != 0 && u != 0) {
	// создаем объект шахматку
		var colorRandom = randomColor({ count: f, hue: 'random', luminosity: 'light' });
		var floorNum = f;	
		for (var i = 1; i <= f; i++ ) {
			var colorFloor = colorRandom[ i ];
			var beginLine = '<div class="line-shah units-'+ u +'">';
			var endLine = '</div>';
						
			for (var j = 1; j <= u; j++) {
				if ( j == 1 ) {
					shah += beginLine;
					shah += shablonFloor( floorNum, colorFloor, u );
				}
				shah += shablonItem(j);
				if  ( j == u ) {
					shah += endLine;
				}
			}
			--floorNum;
			
		}

	}

}

function shablonFloor(f, color, u) {

	var fl = '<div class="item-floor" >' + 
					'<div class="number-floor number-floor-'+ f +'">' +
						'<span style="border-color:'+ color +';">'+ f +'</span><p>этаж</p></div>' +
					'<div class="floor-units"><span class="floor-units-count">'+ u +'</span>' +
						'<p>юнитов</p></div></div>';
	return fl

}
function shablonItem(unitNumber) {
	var un = '<div class="item-shah flat number-'+ unitNumber +'"><div class="item-line type-unit" ><span>квартира</span><span class="nums-unit-count">'+ unitNumber +'</span></div></div>';
	return un
}
function shablonItemChild() {
	var unc = '<div class="item-line type-unit" ><span>квартира</span></div>';
	return unc
}
$('#button-create-shahmatku').click(function(){
	countShahItem( floorCreate, unitCreate);
	$('.wrap-floor').append(shah);

});

// ---- Блок Горизонтального объединения --- 
var widthItemDefault = 180; //Дефолтная длина юнита

//Включение кнопки объединения, добавления класса active
$('#gorizont-combine-button').click(function(){

	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	
	$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			gorizontHover();
			gorizontCombineItem();

		} else {
			
			removeUnbindItem();
		}
		
});
function removeUnbindItem() {

	$('.item-shah').off( "mouseenter mouseleave click" );
	
}
//количество юнитов на этаже
function countUnitsFloor(){
	var lineFloor = $('.line-shah');
	lineFloor.each(function(){

		var l = $(this).children().not('.item-edit-field-row, .item-floor, .item-edit-field-column').length;
		$(this).find('.item-floor .floor-units span').text(l);
		var u = $(this).children().not('.item-edit-field-row, .item-floor, .item-edit-field-column');
		var count = 1;
		u.each(function(){
			$(this).children().children('.nums-unit-count').text(count);
			count++;
		});
		
	});
}
function gorizontHover() {
	
	if( $('#gorizont-combine-button').hasClass('active') ) {
		removeUnbindItem();
		hoverItem();
	}
	if( $('#gorizont-separate-button').hasClass('active') ) {
		removeUnbindItem();
		hoverItem();
	}

	function hoverItem() {
		$('.item-shah').hover(
			function(){
				$(this).addClass('hover-combine');
				if ($('#gorizont-combine-button').hasClass('active')) {
					$(this).next().addClass('hover-combine');
				}

		},
		 function(){
			$('.item-shah').removeClass('hover-combine');
			
		});
	}
}
// h-comb-1-5 --горизонтальное объединение, номера с 1-го юнита по 5-й объединены)
//создание правильного data-unit-h-combine="2-4" - горизонтальное объединение указывающее на объединение юнитов со 2-го по 4-й 
function gorizontCombineItem() {
	if( $('#gorizont-combine-button').hasClass('active') ) {
		var widthPrev; // Длина текущего элемента
		var widthNext; //Длина следущего элемента
		var newWidthItem; // Новая длина элемента
		$('.item-shah').click(
			function(){
			var that = $(this);	
				
				var CombineUnit = marcItemHorizontCombine(that);
				var cc = 'h-comb-' + CombineUnit;
				$(this).addClass( cc );
				
				widthPrev = $(this).outerWidth(true);
				widthNext = $(this).next().outerWidth();
				newWidthItem = widthPrev + widthNext;
				$(this).css({'width': newWidthItem });
				$(this).next().remove();
				var reNumber = that.parent().find('.item-shah');
				var i = 1;
				reNumber.each(function(){
					var u = $(this);
					removeClasNumUnit(u);
					u.addClass('number-'+ i);
					i++;

				});
				countUnitsFloor();
			});
		
	}
}

// Получение номера юнита по переданным классам из класса number-
function getNumUnit(classUnit) {

	var t = classUnit.match( /number-\d+/ );
	var t1 =t[0];
	var t2 = t1.match(/\d+/);
	var num = t2[0];
	return num
}

// Удаление текущего класса number- 
function removeClasNumUnit(uni) {
	var c = uni.attr('class');
	var t = c.match( /number-\d+/ );
		uni.removeClass(t);
}

// Получение номеров юнитов и возврат значения объединенных юнитов 2-5 (со 2-го по 5-й объединены )
function marcItemHorizontCombine(that) {
		var tt1 = that.attr('class');	
		var t1 = tt1.match(/h-comb-\d+-\d+/i);
		var tt2 = that.next().attr('class');
		var t2 = tt2.match(/h-comb-\d+-\d+/i);
		var tt3 = that.prev().attr('class');
		var t3 = tt3.match(/h-comb-\d+-\d+/i);
		
		var UnitCombCurrent; 
		var UnitCombNext; 
		var UnitNumCurrent;
		var UnitNumNext;
		var CombineUnit;
		

	if ( t1 == null && t2 == null ) {
		if (t3 == null) {
			UnitNumCurrent = getNumUnit(tt1);
			console.log(UnitNumCurrent);
			UnitNumNext = getNumUnit(tt2);
			console.log(UnitNumNext);
			CombineUnit = UnitNumCurrent + '-' + UnitNumNext;
			console.log(CombineUnit);	
		} else {
			var ss3 = t3[0].split('-');
			var ss4 = ss3[3];
			UnitNumCurrent = +ss3[3] + 1;
			UnitNumNext = UnitNumCurrent + 1;
			CombineUnit = UnitNumCurrent + '-' + UnitNumNext;
		}
		
		
	} else if ( t1 == null && t2 != null ) {
		that.removeClass(t2);
		if (t3 != null) {

			var ss = t2[0].split('-');
			UnitNumCurrent = +getNumUnit(tt1) + 1;
			UnitNumNext = +ss[3] + 1;
			CombineUnit = UnitNumCurrent + '-' + UnitNumNext;	
		} else {
			var ss = t2[0].split('-');
			UnitNumCurrent = getNumUnit(tt1);
			UnitNumNext = ss[3];
			CombineUnit = UnitNumCurrent + '-' + UnitNumNext;	
		}
		

	} else if ( t1 != null && t2 == null ) {
		that.removeClass(t1);
		var ss = t1[0].split('-');
		console.log(ss);
		UnitNumCurrent = getNumUnit(tt1);
		UnitNumNext = +ss[3] + 1;
		CombineUnit = UnitNumCurrent + '-' + UnitNumNext;
		console.log(CombineUnit);
	} else if ( t1 != null && t2 != null ) {
		that.removeClass(t1);
		that.next().removeClass(t2);
		var ss1 = t1[0].split('-');
		var ss2 = t2[0].split('-');
		UnitNumCurrent = ss1[2];
		UnitNumNext = +ss2[3];
		CombineUnit = UnitNumCurrent + '-' + UnitNumNext;
		console.log(CombineUnit);
	} 
				
	return CombineUnit
				
}
function marcItemHorizonSeparate(that) {
	var itemRow =that.parent().find('.item-shah');			
	var tt1 = that.attr('class');	
	var t1 = tt1.match(/h-comb-\d+-\d+/i);
	var tt2 = that.next().attr('class');
	var t2 = tt2.match(/h-comb-\d+-\d+/i);
	var tt3 = that.prev().attr('class');
	var t3 = tt3.match(/h-comb-\d+-\d+/i);
	
	var UnitCombCurrent; 
	var UnitCombNext; 
	var UnitNumCurrent;
	var UnitNumNext;
	var CombineUnit;
		

	if ( t1 != null ) {
		
		var ss = t1[0].split('-');
		var ss1 = ss[2];
		var ss2 = ss[3];
		var ss3 = ss[3] - ss[2];
		console.log('ss3 ' + ss3);
		if (ss3 > 1) {
			UnitNumCurrent = ss[2];
				console.log(UnitNumCurrent);
			UnitNumNext = +ss[3] - 1;
				console.log(UnitNumNext);
			CombineUnit = UnitNumCurrent + '-' + UnitNumNext;
				console.log(CombineUnit);
			that.removeClass(t1);
			that.addClass('h-comb-' + CombineUnit);		
		} else {
			that.removeClass(t1);
		}

	} 
	var i = 1;
	itemRow.each(function(){
		var u = $(this);
		removeClasNumUnit(u);
		u.addClass('number-'+ i);
		i++;
	});
				
}
$('#gorizont-separate-button').click(function(){

		var $butGrey = $('.create-shahmat-page .button-link-grey');
		$butGrey.not(this).removeClass('active');
		$('#gorizont-separate-button').toggleClass('active');
		if ($('#gorizont-separate-button').hasClass('active')) {
			gorizontHover();
			separateItem();
			
			
		} else {
			removeUnbindItem();
		}
		
});

function separateItem() {
	var currentWidthItem; //Текущая длина элемента
	var newWidthItem; //Новая длина элемента
	$('.item-shah').click(function() {
			var that = $(this);
			currentWidthItem = $(this).outerWidth();
			if ( currentWidthItem > widthItemDefault ) {
				
				var unit = shablonItem(1);
				newWidthItem = currentWidthItem - widthItemDefault - 15 - 30;
				$(this).width(newWidthItem);
				$(this).after(unit);
				var sep = $(this).parent().find('.item-shah').length;
				marcItemHorizonSeparate(that);
			}
			countUnitsFloor();
		}
	)
}
//Вертикальное объединение
$('#vertical-combine-button').click(function(){
	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	$('#vertical-combine-button').toggleClass('active');
	if ($('#vertical-combine-button').hasClass('active')) {
		VerticalHover();
		verticalCombineItem();
	} else {
		removeUnbindItem();
	}
		
});

function VerticalHover() {
	
	if( $('#vertical-combine-button').hasClass('active') ) {
		removeUnbindItem();
		hoverItem();
	}
	if( $('#vertical-separate-button').hasClass('active') ) {
		removeUnbindItem();
		hoverItem();
	}

	function hoverItem() {
		$('.item-shah').hover(
			function(){
				var iu = $(this);
				iu.addClass('hover-combine');
				var ee = iu.parent().find('.item-shah');
				var ii = ee.index(iu);
				var nextFloorItem = iu.parent().next().find('.item-shah');
				nextFloorItem.eq(ii).addClass('hover-combine');
		},
		 function(){
			$('.item-shah').removeClass('hover-combine');
		});
	}
}
function verticalCombineItem() {
	$('.item-shah').click(
			function(){
				var iu = $(this);
				var nextFloorItem = iu.parent().next().find('.item-shah'); //получение элементов след этажа
				var iuClass = iu.attr('class');	 //Получение классов текущего элемента
				var iuClassComb = iuClass.match(/v-comb-f\d+-\d+/i); //Проверяем наличие класса объединение
				var itemAllCur = iu.parent().find('.item-shah'); //Получение набора юнитов текущего этажа
				var flNumCur = iu.parent().find('.item-floor').children().children('span').text(); //Получение тномера текущего этажа
				var indexCur = itemAllCur.index(iu); // индекс текущего элемента в наборе
				var nextClass = nextFloorItem.eq(indexCur).attr('class');
				var iuClassCombNext = nextClass.match(/v-comb-f\d+-\d+/i); //Проверяем наличие класса объединения у след элемента
				if (iuClassCombNext == null && iuClassComb == null) {
					
					var tt = +indexCur + 1;
					iu.addClass('v-comb-f' + flNumCur + '-' + tt);
					nextFloorItem.eq(indexCur).addClass('v-comb-f' + flNumCur + '-' + tt);
					
				} else if (iuClassCombNext == null && iuClassComb != null) {
					
					nextFloorItem.eq(indexCur).addClass(iuClassComb);
				} else if (iuClassCombNext != null && iuClassComb == null) {
					
					iu.addClass(iuClassCombNext);
				} else {
					
					var wrapFloor = $('.wrap-floor .item-shah');
					wrapFloor.each(function(){
						var it = $(this);
						if(it.hasClass(iuClassCombNext)) {
							it.removeClass(iuClassCombNext).addClass(iuClassComb);
						}
					});
				}
				nextFloorItem.eq(indexCur).addClass('vertical-combine');
				nextFloorItem.eq(indexCur).children().remove();

				
	});
}

function marcItemVerticalSeparate(iu) {
		
		var nextFloorItem = iu.parent().next().find('.item-shah'); //получение элементов след этажа
		var nextNextFloorItem = iu.parent().next().next().find('.item-shah'); //получение элементов след этажа после след

		var iuClass = iu.attr('class');	 //Получение классов текущего элемента
		var iuClassComb = iuClass.match(/v-comb-f\d+-\d+/i); //Проверяем наличие класса объединение
		var itemAllCur = iu.parent().find('.item-shah'); //Получение набора юнитов текущего этажа
		var flNumCur = iu.parent().find('.item-floor').children().children('span').text(); //Получение номера текущего этажа
		var flNumNext = iu.parent().next().find('.item-floor').children().children('span').text(); //Получение номера текущего этажа
		var indexCur = itemAllCur.index(iu); // индекс текущего элемента в наборе
		var nextClass = nextFloorItem.eq(indexCur).attr('class');
		var iuClassCombNext = nextClass.match(/v-comb-f\d+-\d+/i); //Проверяем наличие класса объединения у след элемента
		
			
			var tt = +indexCur + 1;
			var allItem = iu.parent().parent().find('.item-shah'); //Все элементы дома
			var indexThis = +allItem.index(iu);
			var indexNext = indexThis + 1;
			if (!iu.hasClass('vertical-combine') && !nextNextFloorItem.eq(indexCur).hasClass('vertical-combine')) {
				iu.removeClass(iuClassComb);
				nextFloorItem.eq(indexCur).removeClass(iuClassComb);
				
			} else if (!iu.hasClass('vertical-combine') && nextNextFloorItem.eq(indexCur).hasClass('vertical-combine')) {
				iu.removeClass(iuClassComb);
				nextFloorItem.eq(indexCur).removeClass(iuClassComb).addClass('v-comb-f' + flNumCur + '-' + tt);
				for (var i = indexNext; i < allItem.length; i++ ) {
				
					if( allItem.eq(i).hasClass(iuClassComb)) {
						
						allItem.eq(i).removeClass(iuClassComb).addClass('v-comb-f' + flNumNext + '-' + tt);

					}

				}
				

			} else if(iu.hasClass('vertical-combine') && nextFloorItem.eq(indexCur).hasClass('vertical-combine') && !nextNextFloorItem.eq(indexCur).hasClass('vertical-combine')) {
				nextFloorItem.eq(indexCur).removeClass(iuClassComb);
				

			} else if (iu.hasClass('vertical-combine') && nextFloorItem.eq(indexCur).hasClass('vertical-combine') && nextNextFloorItem.eq(indexCur).hasClass('vertical-combine')) {
				
				for (var i = indexNext; i < allItem.length; i++ ) {
				
					if( allItem.eq(i).hasClass(iuClassComb)) {
						
						allItem.eq(i).removeClass(iuClassComb).addClass('v-comb-f' + flNumNext + '-' + (indexCur + 1));

					}

				}
				

			}

		
}
//Вертикальное разделение
$('#vertical-separate-button').click(function(){
		var $butGrey = $('.create-shahmat-page .button-link-grey');
		$butGrey.not(this).removeClass('active');
		$('#vertical-separate-button').toggleClass('active');
		if ($('#vertical-separate-button').hasClass('active')) {
			VerticalHover();
			verticalSeparateItem();
		} else {
			removeUnbindItem();
		}
		
});
function verticalSeparateItem() {
	$('.item-shah').click(
			function(){
				var iu = $(this);
				var ee = iu.parent().find('.item-shah');
				var ii = ee.index(iu);
				var nextFloorItem = iu.parent().next().find('.item-shah');
				marcItemVerticalSeparate(iu);
				if (nextFloorItem.eq(ii).hasClass('vertical-combine')) {
					nextFloorItem.eq(ii).removeClass('vertical-combine');
					var childElement = shablonItemChild();
					nextFloorItem.eq(ii).append(childElement);
					
				}
				
				
	});
}
// коммерческие площади
$('#button-commercial-sqare').click(function(){
	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	$('#button-commercial-sqare').toggleClass('active');
	if ($('#button-commercial-sqare').hasClass('active')) {
		commercSqare();
	} else {
		removeUnbindItem();
	}
		
});
function commercSqare() {

	$('.item-shah').hover(
	function(){
		var iu = $(this);
		iu.addClass('hover-combine');
		iu.click(function(){
			iu.removeClass('flat').addClass('commerce').children().text('коммерч.');
		});
		
	},
	function(){
		$('.item-shah').removeClass('hover-combine');
	});
}

//Убрать коммерческие площади
$('#button-notcommercial-sqare').click(function(){
	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	$('#button-notcommercial-sqare').toggleClass('active');
	if ($('#button-notcommercial-sqare').hasClass('active')) {
		notCommercSqare();
	} else {
		removeUnbindItem();
	}
		
});
function notCommercSqare() {

	$('.item-shah').hover(
	function(){
		var iu = $(this);
		iu.addClass('hover-combine');
		iu.click(function(){
			iu.removeClass('commerce').addClass('flat').children().text('квартира');
		});
		
	},
	function(){
		$('.item-shah').removeClass('hover-combine');
	});
}
// Переключение этапов
$('.button-next-etap').click(function(){
	
	var etaps = $('.etap-creator');
	var current = $('.etap-creator.current');
	//1-й этап создание шахматки
	if ($('.etap-creator-1').hasClass('current')) {		
		var el = $('.item-shah').length;
		if (el != 0) {	
			current.removeClass('current').addClass('hidden');
			current.next().removeClass('hidden').addClass('current');
		} else {
			errorMessage(1, 0, 0);
		}
		
	}
	//2-й этап простановка количества комнат
	if ($('.etap-creator-2').hasClass('current')) {
		if ( !$('.wrap-floor > div').is('.line-edit')) {
			shablonRowEdit();
			addFiedsEditUnit();

		} else {
			var ttt = flatNumberCounter();
			if (ttt) {
			
				errorMessage(5, 0, 0);

			} else {

				current.removeClass('current').addClass('hidden');
				current.next().removeClass('hidden').addClass('current');
			}
		}
		
	}
	// 3-й этап установка площади квартир
	if ($('.etap-creator-3').hasClass('current')) {
		flatCount();
		var sss = flatSqareCounter();
		if (sss) {
		
			errorMessage(6, 0, 0);

		} else {

			current.removeClass('current').addClass('hidden');
			current.next().removeClass('hidden').addClass('current');
			
			
		}
	}
	// 4-й этап нумерация квартир
	if ($('.etap-creator-4').hasClass('current')) {
		flatCount();
		var ddd = flatNumUnitsCounter();
		if (ddd) {
			errorMessage(7, 0, 0);
		} else {

			current.removeClass('current').addClass('hidden');
			current.next().removeClass('hidden').addClass('current');
		}
		
		
	}
	// 5-й этап шахматки установка цен
	if ($('.etap-creator-5').hasClass('current')) {
		flatCount();
		current.removeClass('current').addClass('hidden');
		current.next().removeClass('hidden').addClass('current');

		
	}
	// 6-й этап шахматки  добавление изображений
	if ($('.etap-creator-6').hasClass('current')) {
		flatCount();
		current.removeClass('current').addClass('hidden');
		current.next().removeClass('hidden').addClass('current');
		var ed = $('.item-edit-field-column').children().children().is('.create-button');
		if (!ed) {
			changeInputCreateButton();
		}

	}
	// 7-й этап шахматки  добавление особенностей
	if ($('.etap-creator-7').hasClass('current')) {
		addLineStatus(); //Добавление линии статуса
		current.removeClass('current').addClass('hidden');
		current.next().removeClass('hidden').addClass('current');

	}
	// 8-й этап шахматки  изменение статусов и опубликование
	if ($('.etap-creator-8').hasClass('current')) {
		removeLineColumnEdit();
		$('.button-next-etap').text('Опубликовать');
		
	}


	$('.create-shahmat-page .button-link-grey').removeClass('active');
	removeUnbindItem();		
});

// $.fn.addClassCurrent = function() {
// 	removeLineColumnEdit();
// 	var cl = 'current'
// 	this.addClass(cl);
// 	return this;
// }

$('.button-prev-etap').click(function(){
	var etaps = $('.etap-creator');
	var current = $('.etap-creator.current');
	visibleElementRight();
			visibleElementLeft();
	//2-й этап простановка количества комнат
	if ($('.etap-creator-2').hasClass('current')) {
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');
		
	}
	// 3-й этап установка площади квартир
	if ($('.etap-creator-3').hasClass('current')) {
		flatCount();
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');
	}
	// 4-й этап нумерация квартир
	if ($('.etap-creator-4').hasClass('current')) {
		flatCount();
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');
	}
	// 5-й этап шахматки установка цен
	if ($('.etap-creator-5').hasClass('current')) {
		flatCount();
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');

		
	}
	// 6-й этап шахматки  добавление изображений
	if ($('.etap-creator-6').hasClass('current')) {
		changeInputCreateFields();
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');
	}
	// 7-й этап шахматки  добавление особенностей
	if ($('.etap-creator-7').hasClass('current')) {
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');

	}
	// 8-й этап шахматки  изменение статусов и опубликование
	if ($('.etap-creator-8').hasClass('current')) {
		shablonRowEdit();
		changeInputCreateButton();
		$('.button-next-etap').text('Далее');
		current.removeClass('current').addClass('hidden');
		current.prev().removeClass('hidden').addClass('current');
		
	}
});

//Добавление инпута на все юниты
function addFiedsEditUnit() {
	var all = $('.line-shah .item-shah');
		all.each(function(){
		if(!$(this).hasClass('item-edit-field-row') && !$(this).hasClass('vertical-combine')) {
			$(this).append('<div class="item-line item-line-edit"><input type="text" class="inner-input-create"></div>');			
		}
	});
}
function shablonRowEdit() {
	var numClass = $('.line-shah').attr('class');
	var itemClass = numClass.match(/units-\d+/i);
	var numO = itemClass[0].match(/\d+/i);
	var num = +numO[0];
	var items = '';
	var rowEdit = '<div class="item-shah item-edit-field-row"><div class="item-line" ><input type="text" class="create-fields"></div></div>';
	var sfB = '<div class="line-edit"><div class="item-floor floor-edit"> <div class="number-floor number-floor-edit">' +
						'<span>E</span></div></div>'; 
	var sfE =  '</div>';
	for (var i = 1; i <= num; i++) {
		items +=  '<div class="item-shah item-edit-field-column"><div class="item-line number-' + i + '">' +
						'<input type="text" class="create-fields">' +
					'</div></div>';
		
	}
	var shablon = sfB + items + sfE;
	$('.line-shah:first-child').before(shablon);
	$('.item-floor').after(rowEdit);

	flatCount();

}
function flatCount() {
	$('.wrap-floor').on('focusout','.create-fields', function(){
		var valFields = $(this).val(); //значение из поля нумерации этажа
		var listClass = $(this).parent().attr('class');
		var itemClass = listClass.match(/number-\d+/i);
		var indColumn = itemClass[0].match(/(\d+)/ig); //номер столбца для нумерации
		var indi = +indColumn - 1;
		// console.log('indi - ' + indi);
		
		
		var allElem = $('.line-shah .item-shah').not('.item-edit-field-row, .item-floor');
		//-----------------------
		if (valFields != 0 ) {
			var ll = $('.number-floor').not('.number-floor-edit');
			
		
			addFlatCount(ll, indi, valFields); //Добавление к-во комнат из столбца
			
			$(this).val(' ');
		}
		statistikFlatCount(); //Сбор статистики к-ва квартир
	});

	//Обработчик на внутренний инпут
	$('.wrap-floor').on('focusout','.inner-input-create', function(){
		var inVal = $(this).val();
		var inObj = $(this);

		if (inVal != 0) {
			var customInVal = $(this).parent().parent().find('.item-line');
			var cc = $(this).parent().parent().attr('class');
			var cc3 = cc.match(/h-comb-\d+-\d+/i);
			

			if ($('.etap-creator-2').hasClass('current')) {

				if(inObj.parent().parent().hasClass('commerce')) {
					addItemLineInner(customInVal, 'number-room');
					$(this).parent().parent().prepend(shablonItemLine ('k'));		
				} else {
					
					addItemLineInner(customInVal, 'number-room');
					$(this).parent().parent().prepend(shablonItemLine(inVal));		
				}
				
			}
			if ($('.etap-creator-3').hasClass('current')) {
				
				// $(this).parent().parent().prepend( shablonSqare (inVal) );
				editSqareinnerInput (inObj, inVal);	
			}
			if ($('.etap-creator-5').hasClass('current')) {
				
				priceFlatInner(inObj, inVal)
				
			}			
			
										
			$(this).val(' ');	
		

		}
		statistikFlatCount();
	});
	
}
function addFlatCount(objLine, indi, valueFields) {
		objLine.each(function(k, v){
				var t = $(this);
				var t1 = t.attr('class');
				var t2 = t1.match(/number-floor-\d+/i); // класс этажа с номером
				var line = $('.' + t2).parent().siblings().not('.item-edit-field-row');
				var linelength = line.length; // текущее к-во юнитов на этаже после объединения
				
				var l = t.parent().parent().attr('class').match(/(units-\d+)/ig); 
				var unitsDefault =l[0].match(/(\d+)/ig); // дефолтное юнитов на этаже
				if ( unitsDefault == linelength ) {
					var sr = line.eq(indi).children().children().first().hasClass('number-room');
					var sr1 = line.eq(indi).hasClass('vertical-combine');
					var sr2 = line.eq(indi).hasClass('commerce');
					
						if (!sr1) {
							if (!sr2) {
								//Для второго этапа простановка количества комнат
								
								if ( !sr ) {
								var etap2 = $('.etap-creator-2').hasClass('current');
									if (etap2) { 
										
											line.eq(indi).prepend( shablonItemLine (valueFields) );
										
										
									}
								}
								//Для третьего этапа простановка площади квартир
								var etap3 = $('.etap-creator-3').hasClass('current');
								if (etap3) { 
									
									buttonTypeSqareFlat(line, indi, valueFields);
									
										
									
								}
								//Для пятого этапа простановка стоимости квартир
								var etap5 = $('.etap-creator-5').hasClass('current');
								if (etap5) { 
									
									// buttonTypeSqareFlat(line, indi, valueFields);
									priceFlat(line, indi, valueFields);
									
										
									
								}		
							} else {
								if ( !sr ) {
									var etap2 = $('.etap-creator-2').hasClass('current');
									if (etap2) { 
										
											addItemLineInner(line.eq(indi), 'number-room');
											line.eq(indi).prepend(shablonItemLine ('k'));
										
										
									}
								}
								
							}	
						}
						
					
				} else if (unitsDefault > linelength) {
					// console.log('variant  >>> ');
					// console.log('unitsDefault ' + unitsDefault + ' linelength ' + linelength + ' indi ' + indi);
					var dif = unitsDefault - linelength;
					var	indiS = indi - dif;
					if (indiS == 0) {
						indiS = indiS + 1;
						console.log('--1');
					} else if (indiS == 0 || indiS < 0) {
						indiS = 0;
						console.log('--2');
					} else if (indiS >= linelength) {
						indiS = linelength;
						console.log('--3');
					} else {
						indiS = linelength - dif - 1;
						console.log('--4');
					}
					var o = line.eq(indiS).attr('class');
					var o1 = o.match(/h-comb-\d+-\d+/i); // класс текущего юнита
					if ( o1 != null ) {
						var o2 = o1[0].match(/\d+/gi);	//позиции класса объединения
					}
					// console.log(' indi '+ indi +' indiS ' + indiS + ' dif ' + dif);
					// console.log(line.eq(indiS));
					var sr12 = line.eq(indiS).hasClass(o1);
					var sr22 = line.eq(indiS).hasClass('vertical-combine');
					var sr32 = line.eq(indiS).hasClass('commerce');
					if ( !sr12  ) {
						if (!sr22) {	
							if (!sr32) {
								if ($('.etap-creator-2').hasClass('current')) { //Для второго этапа простановка количества комнат
									if ( !line.eq(indiS).children().children().first().hasClass('number-room')  ) {
										line.eq(indiS).prepend( shablonItemLine (valueFields) );	
									}
								}
								if ($('.etap-creator-3').hasClass('current')) { //Для третьего этапа простановка площади комнат
									
										line.eq(indiS).prepend( shablonSqare (valueFields) );

									
								}

							}
						}					
					} 
				} 
			});
}

function addItemLineInner(obj, classLine) {
	obj.each(function(){
		if ($(this).children().hasClass(classLine)	) {
			$(this).remove();
		}
	});
}

//шаблон параметра к-во комнат
function shablonItemLine (val) {
	if( val == 'k') {
		val = val;
	} else {
		val = parseInt(val);
	}
	
	return '<div class="item-line" ><span class="number-room number-room-' + val + '">' + val + '</span>' +
									'</div>'
};
function statistikFlatCount() {

	var tr = $('.item-shah .number-room');
	var ar = {};
	var allStat ='';
	tr.each(function(){
		var s = $(this).text();
		if (ar[s] == undefined) {
			ar[s] = 1;	
		} else {
			ar[s] = ar[s] + 1;
		}
	});
	for ( var key in ar) {
		allStat += shablonStatistikFlatCount(key, ar[key] );
	}
	$('.table-statistika tbody').html(allStat);
	
}
function shablonStatistikFlatCount(flat, roomCount ) {
	var ss = '<tr><td>' + flat + '</td><td>' + roomCount + '</td></tr>';
	return ss;
}
function flatNumberCounter() {
	var q1 = $('.item-shah').children().children('.number-room').length;
	var q2 = $('.item-shah').not('.item-edit-field-row, .item-floor, .item-edit-field-column').length;
	var q3Commerce = $('.item-shah.commerce').length;
	if (q3Commerce != 0) {
		q1 = q1 + q3Commerce;
		if (q1 < q2) {
			return true
		} else {
			return false
		}
	} else {
		if (q1 < q2) {
			return true
		} else {
			return false
		}
	}
		

}
function flatSqareCounter() {
	var s1 = $('.item-shah').children().children('.area-all-first').length;
	var s2 = $('.item-shah').not('.item-edit-field-row, .item-floor, .item-edit-field-column').length;
	if (s1 == 0 && s2 == 9 ) {
		return false

	} else {
		if (s1 < s2) {
			return true
		} else {
			return false
		}
	}
}
function flatNumUnitsCounter() {
	var q1 = $('.item-shah').children().children('.number-item').length;
	var q2 = $('.item-shah').not('.item-edit-field-row, .item-floor, .item-edit-field-column').length;
	var q3Commerce = $('.item-shah.commerce').length;
	if (q3Commerce != 0) {
		q1 = q1 + q3Commerce;
		if (q1 < q2) {
			return true
		} else {
			return false
		}
	} else {
		if (q1 < q2) {
			return true
		} else {
			return false
		}
	}
		

}
//Кнопка общей площади
$('#button-all-sqare-flat').click(function(){
	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	$('#button-all-sqare-flat').toggleClass('active');
	if ($('#button-all-sqare-flat').hasClass('active')) {
		
	} else {
		removeUnbindItem();
	}
		
});
//Кнопка жилой площади
$('#button-live-sqare-flat').click(function(){
	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	$('#button-live-sqare-flat').toggleClass('active');
	if ($('#button-live-sqare-flat').hasClass('active')) {
		
	} else {
		removeUnbindItem();
	}
		
});
//Кнопка кухни площади
$('#button-kitchen-sqare-flat').click(function(){
	var $butGrey = $('.create-shahmat-page .button-link-grey');
	$butGrey.not(this).removeClass('active');
	$('#button-kitchen-sqare-flat').toggleClass('active');
	if ($('#button-kitchen-sqare-flat').hasClass('active')) {
		
	} else {
		removeUnbindItem();
	}
		
});
//Функция добавления типа площади
var butType = ''; //переменная активной кнопки площади
function buttonTypeSqareFlat(lineElem, indexElem, valueIn) {
	
	if ($('#button-all-sqare-flat').hasClass('active')) {
		butType = 'allsqare';
		
		if (lineElem.eq(indexElem).children().children().first().hasClass('area-all-first')) {

				
				lineElem.eq(indexElem).children().children().first().filter('.area-all-first').remove();
				lineElem.eq(indexElem).children().first().prepend( shablonSqare (valueIn) );	
			} else {
				lineElem.eq(indexElem).children().first().prepend( shablonSqare (valueIn) );
					
			}
			if (lineElem.eq(indexElem).children().children().is('.area-item.area-all')) {

				lineElem.eq(indexElem).children().children('.area-item.area-all').parent().remove();
				lineElem.eq(indexElem).children().first().after(shablonSqareLineItem(butType, valueIn));

			} else {

				lineElem.eq(indexElem).children().first().after(shablonSqareLineItem(butType, valueIn));
			}
		
		

	} else if ($('#button-live-sqare-flat').hasClass('active')) {
		butType = 'livesqare';
		
		if ( lineElem.eq(indexElem).children().first().children().hasClass('area-item')) {
			var ss = lineElem.eq(indexElem).children().children('.area-all-first').text().match(/\d+/gi);

			if (ss > +valueIn) {
				if (lineElem.eq(indexElem).children().children().is('.area-item.area-live')) {
					lineElem.eq(indexElem).children().children('.area-item.area-live').parent().remove();
					lineElem.eq(indexElem).children().children('.area-all').parent().after( shablonSqareLineItem(butType, valueIn) );

				} else {
					lineElem.eq(indexElem).children().children('.area-all').parent().after( shablonSqareLineItem(butType, valueIn) );
				}
			} else {
				 errorMessage(3, ss, valueIn);
			}
			
			
			
		} else {
			$('.info-danger-text').addClass('show').children('.inner-info-danger-text').html('<strong>Ошибка!</strong> Задайте общую площадь квартиры! ');
		}
	} else if ($('#button-kitchen-sqare-flat').hasClass('active')) {
		butType = 'kitchensqare';
		
		if ( lineElem.eq(indexElem).children().first().children().hasClass('area-item')) {
			var ss = lineElem.eq(indexElem).children().children('.area-all-first').text().match(/\d+/gi);
			var un = lineElem.eq(indexElem).children().children('.area-live').length;
			
			if ( un != 0 ) {
					if (ss > +valueIn) {
						if (lineElem.eq(indexElem).children().children().is('.area-item.area-kitchen')) {
							lineElem.eq(indexElem).children().children('.area-item.area-kitchen').parent().remove();
							lineElem.eq(indexElem).children().children('.area-live').parent().after( shablonSqareLineItem(butType, valueIn) );
						} else {
							lineElem.eq(indexElem).children().children('.area-live').parent().after( shablonSqareLineItem(butType, valueIn) );
						}
					} else {
						 errorMessage(4, ss, valueIn);
					}

					
				} else {
					if (ss > +valueIn) {
						if (lineElem.eq(indexElem).children().children().is('.area-item.area-kitchen')) {
							lineElem.eq(indexElem).children().children('.area-item.area-kitchen').parent().remove();
							lineElem.eq(indexElem).children().children('.area-all').parent().after( shablonSqareLineItem(butType, valueIn) );
						} else {
							lineElem.eq(indexElem).children().children('.area-all').parent().after( shablonSqareLineItem(butType, valueIn) );
						}
					} else {
						 errorMessage(4, ss, valueIn);
						
						
					}
				}

			
		} else {

			errorMessage(2, 0, 0);
		}
	}
}

//шаблон Общей площади квартир
function shablonSqare(valueFields) {
	var sq = '<div class="area-item area-all-first">' + valueFields + '<span>кв.м</span></div>';
	return sq
}
function shablonSqareLineItem(textType, valueFields) {
	var text = '';
	var classArea = '';
	if (textType == 'allsqare') {
		text = 'Общая';
		classArea = 'area-all';
	} else if (textType == 'livesqare') {
		text = 'Жилая';
		classArea = 'area-live';
	} else if (textType == 'kitchensqare') {
		text = 'Кухня';
		classArea = 'area-kitchen';
	} 
	var sqi = '<div class="item-line"><span>' + text +'</span><div class="area-item '+ classArea +'"><span class="area-num">' + valueFields + '</span><span>кв.м</span></div></div>';
	return sqi
}
function editSqareinnerInput (objVal, valInner) {
	var elemPar = objVal.parent().parent();
	//общая площадь
	if ($('#button-all-sqare-flat').hasClass('active'))	{

		elemPar.find('.area-all-first').remove();
		elemPar.find('.area-all').parent().remove();
		elemPar.children().first().prepend( shablonSqare(valInner) );	
		elemPar.children().first().after(shablonSqareLineItem(butType, valInner));

	} // жилая площадь
		else if ($('#button-live-sqare-flat').hasClass('active')) {
			elemPar.find('.area-live').parent().remove();
			console.log(elemPar.find('.area-live'));
			elemPar.children().first().after(shablonSqareLineItem(butType, valInner)); 

	} //площадь кухни 
		else if ($('#button-kitchen-sqare-flat').hasClass('active')) {
			elemPar.find('.area-kitchen').parent().remove();
			elemPar.children().first().after(shablonSqareLineItem(butType, valInner));
	}
}
function errorMessage(er, inVal1, inVal2) {
	
	var erMessage = '';

	switch(er) {
		case 1 :
			erMessage = '<strong>Ошибка №1!</strong> создайте шахматку';
		break;
		case 2:
			erMessage = '<strong>Ошибка №2!</strong> Задайте общую площадь квартиры!';
		break;
		case 3:
			erMessage = '<strong>Ошибка №3!</strong> Жилая площадь не может быть больше общей площади квартиры!<br> <strong>Общая площадь: </strong>'
			 + inVal1 +' кв.м.' +'<br> <strong>Жилая: </strong>' +inVal2 +' кв.м.';
		break;
		case 4:
			erMessage = '<strong>Ошибка №4!</strong> Площадь кухни не может быть больше общей площади квартиры!<br> <strong>Общая площадь: </strong>'
			 + inVal1 +' кв.м.' +'<br> <strong>Жилая: </strong>' +inVal2 +' кв.м.';
		break;
		case 5:
			erMessage = '<strong>Ошибка №5!</strong> Не все квартиры заполнены! Заполните все квартиры!';			
		break;
		case 6:
			erMessage = '<strong>Ошибка №6!</strong> Не всем квартирам задана Общая площадь! Заполните все квартиры!';			
		break;
		case 7:
			erMessage = '<strong>Ошибка №7!</strong>Задайте нумерацию всем квартирам!';			
		break;


	}
	var message = '<div class="alert alert-warning alert-dismissible show info-danger info-danger-text fade" role="alert"><div class="inner-info-danger-text"></div>' +
										  
		erMessage + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
	
	$('.etap-creator.current .alert-block-message').html(message);
	setTimeout(function(){
		$('.etap-creator.current .alert-block-message').empty();
	},1500);

	

}

$('#button-numbering-flat').click(function(){
	
	numberingFlat();

});
// 
// ID элемента span = ID проекта
// <span id="pr2" class="name-project-creator">ЖК "Комфорт таун", Регенераторная 4</span>
// .section-id = ID секции проекта 
// <span id="s1" class="border-violet sections-creator section-id">A</span>
// ID юнита = Проект ID + Секция ID + Этаж ID + Номер Юнита

//Нумерация квартир и простановка ID квартир
function numberingFlat() {
	var numFirst = $('#first-number-flat').val();
	var numLast = $('#last-number-flat').val();
	var skipCommerce = $('#input-skip-commerce').prop("checked");
	var allElem = $('.line-shah .item-shah').not('.item-edit-field-row, .item-floor, .item-edit-field-column');
	var allElemLength = allElem.length;
	var lineFloor = $('.line-shah').not('.item-edit-field-row, .item-floor, .item-edit-field-column');
	var idProject = $('.name-project-creator').attr('id');
	var idSection = $('.section-id').attr('id');
	var idFloor ='';
	var idUnits = '';
	var k = 0;
	// console.log(lineFloor);
	
	if (numFirst != 0) {
		var nn = +numFirst + allElemLength;
		var num1 = numFirst;
		for (var j = lineFloor.length - 1; j >= 0; j--) {
				k++;
				idFloor = 'f' + k;

			// console.log($(lineFloor[j]).children().not('.item-edit-field-row, .item-floor'));
			$(lineFloor[j]).children().not('.item-edit-field-row, .item-floor').each(function(){
				
				if ($(this).hasClass('commerce')) {
					if (!skipCommerce) {
						$(this).children().first().children('.number-item').remove();
						$(this).children().first().append(shablonNumberFlat(num1));
						
					} else {
						$(this).children().first().children('.number-item').remove();
						num1--;

					}
					idUnits = idProject + '-' + idSection + '-' + idFloor + '-' + num1;
					$(this).attr('id', idUnits);
				} else {
					if ($(this).children().first().children().hasClass('number-item')) {
							
							$(this).children().first().children('.number-item').remove();
							$(this).children().children('.number-room').after(shablonNumberFlat(num1));
							
						} else {
							$(this).children().children('.number-room').after(shablonNumberFlat(num1));
						}
						idUnits = idProject + '-' + idSection + '-'  + idFloor + '-' + num1;
						$(this).attr('id', idUnits);	
				}
				num1++;	
			
			});

		}

		nn = nn - 1;
		
	} 
}
function shablonNumberFlat(n) {
	var shab = '<div class="number-item">№ ' + n + '</div>';
	return shab
}

$('#first-number-flat').focusin(function(){
	$('#first-number-flat-chekcbox').prop("checked", true);
	$('#last-number-flat').val('');
});
$('#first-number-flat').focusout(function(){
	var numFirst = $('#first-number-flat').val();
	if (numFirst != 0) {
		$('#first-number-flat-chekcbox').prop("checked", true);
	} else {
		$('#first-number-flat-chekcbox').prop("checked", false);
	}
});

//Добавление цен на квартиры
function priceFlat(lineElem, indexElem, valueIn) {
		var areaM2 = lineElem.eq(indexElem).children().children('.area-all').children('.area-num').text().replace(/\,/ig,'.');
		if (lineElem.eq(indexElem).children('.item-line').hasClass('price-line')) {
			lineElem.eq(indexElem).children('.item-line.price-line').remove();
			lineElem.eq(indexElem).children('.type-unit').after(shablonPriceItem(valueIn, areaM2));
		} else {
			lineElem.eq(indexElem).children('.type-unit').after(shablonPriceItem(valueIn, areaM2))
		}
	
}
function priceFlatInner(objElem, valueIn) {
	var areaM2 = objElem.parent().parent().children().children('.area-all').children('.area-num').text().replace(/\,/ig,'.');
	if (objElem.parent().parent().children().is('.price-line') ) {
		objElem.parent().parent().children('.item-line.price-line').remove();
		objElem.parent().parent().children('.type-unit').after(shablonPriceItem(valueIn, areaM2))

	} else {
		objElem.parent().parent().children('.type-unit').after(shablonPriceItem(valueIn, areaM2))
	}
		
}
function convertNumberSpace(n) {
	n = n.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return n
}
function shablonPriceItem(price, m2) {
	var priceAll = +m2 * +price.replace(/\,/ig,'.');
		priceAll = convertNumberSpace(priceAll.toFixed(2));

		price = price.replace(/\,/ig,'.');
		price = parseFloat(price).toFixed(2);
		price = convertNumberSpace(price);
	var shabl = '<div class="item-line price-line"><div class="price-area price-area-m2"><span class="sum-price">'+ price +'</span><span>за кв.м</span></div></div>' +
						'<div class="item-line price-line"><div class="price-area price-area-all"><span class="sum-price">'+ priceAll + '</span><span>грн</span></div><div class="currence-switcher"><button type="button"  class="filter-button grivna selected">' +
					'<span class="icon-grivna"></span></button><button type="button" class="filter-button dollar"><i class="fas fa-dollar-sign"></i></button></div></div>';
	return shabl
}

// Модалка Добавить фото в этапе 6
$('#download-group-photo').click(function(){
		$('#modal-add-photo').modal('show');
		$('#modal-add-photo').on('shown.bs.modal', function (e) {
		

		});
		
});
$('#delete-image-group-photo').click(function(){
		$('#input-remove-val').val('2');
		$('#modal-remove-photo-etap').modal('show');
		$('#modal-remove-photo-etap').on('shown.bs.modal', function (e) {
			$('.message-delete').text('Точно удалить фотографию (группу фотографий)');
			$('#input-rcheckemove-val').val('2');
		});
		$('#modal-remove-photo-etap').on('hide.bs.modal', function (e) {
			$('#input-remove-val').val('0');
		});
		
});

$('.button-add-photo-form').click(function(){
				var gallery = $('.gallery-image-etap');
				var file = $('#photo-modal-add-lead').get(0).files[0];
				var reader  = new FileReader();
				
				 reader.onloadend = function () {
				
					gallery.append(shablonImgEtap(reader.result));
					checkFileGalleryButton();
					
				}
				if (file) {
				  reader.readAsDataURL(file);
					
				}
				$('#modal-add-photo').modal('hide');

			});




function shablonImgEtap(srcImg) {
	var r = '<a data-fancybox="gallery" href="'+ srcImg +'"><img src="'+ srcImg +'">' +
		'<button type="button" title="Выбрать" class="task-button-element  check-file-gallery-button"><i class="far fa-square"></i></button></a>';
		return r
													
}
function changeInputCreateButton() {
	var allElem = $('.item-shah').not('.item-edit-field-row, .item-edit-field-column');
	var sv = '<input type="button" class="create-button" value="Столб">';
	var sh = '<input type="button" class="create-button" value="Этаж">';
	var si = '<input type="button" class="create-button-inner-unit" value="Выбрать">';
	$('.item-edit-field-row .create-fields').remove();
	$('.item-edit-field-column .create-fields').remove();
	$('.item-shah .inner-input-create').remove();
	$('.item-edit-field-row .item-line').append(sh);
	$('.item-edit-field-column .item-line').append(sv);
	allElem.each(function(){
		var el = $(this);
		var ch = el.children('.item-line-edit').children().is('.create-button-inner-unit');
		if (!ch) {
			$('.item-shah .item-line-edit').append(si);
		}
	});
	
	

}
function changeInputCreateFields() {
	// <input type="text" class="inner-input-create">
	// <input type="text" class="create-fields">
	var allElem = $('.item-shah').not('.item-edit-field-row, .item-edit-field-column');
	var sv = '<input type="button" class="create-button" value="Столб">';
	var sh = '<input type="button" class="create-button" value="Этаж">';
	var si = '<input type="button" class="create-button-inner-unit" value="Выбрать">';
	var si2 = '<input type="text" class="inner-input-create">';
	var sl = '<input type="text" class="create-fields">';
	$('.item-edit-field-row .create-button').remove();
	$('.item-edit-field-column .create-button').remove();
	$('.item-shah .create-button-inner-unit').remove();


	$('.item-edit-field-row .item-line, .item-edit-field-column .item-line').append(sl);
	// $('.item-edit-field-column .item-line').append(sv);
	allElem.each(function(){
		var el = $(this);
		var ch = el.children('.item-line-edit').children().is('.inner-input-create');
		if (!ch) {
			$('.item-shah .item-line-edit').append(si2);
		}
	});
	
	

}
$('#create-group-photo').click(function(){
		
		$('#modal-add-group-photo').modal('show');
		$('#modal-add-group-photo').removeClass('edit');
		$('#modal-add-group-photo').addClass('create');
		$('#modal-add-group-photo').on('shown.bs.modal', function (e) {
			$('.button-add-name-group').text('Добавить');
		});
});
$('#delete-group-photo').click(function(){
		var curOption = $('#photo-group-select option:selected');
		$('#modal-remove-photo-etap').modal('show');
		$('#modal-remove-photo-etap').on('shown.bs.modal', function (e) {
			$('#input-remove-val').val('1');
			var photoLength = $('.gallery-image-etap a').length;
			if (photoLength > 0) {
				$('.message-delete').text('Группа не пустая. В группе ' + photoLength + ' фотографий. При удалении группы, удалятся все фотографии. Точно удалить группу');
			} 

		});
		$('#modal-remove-photo-etap').on('hide.bs.modal', function (e) {
			$('#input-remove-val').val('0');
		});


});
$('#edit-group-photo').click(function(){
		$('#modal-add-group-photo').modal('show');
		$('#modal-add-group-photo').removeClass('create');
		$('#modal-add-group-photo').addClass('edit');
		$('#modal-add-group-photo').on('shown.bs.modal', function (e) {
			$('.button-add-name-group').text('Редактировать');
		});
});
$('#remove-group-button').click(function(){
	var forCheck = parseInt($('#input-remove-val').val());
	if (forCheck == 1) {
		var curOption = $('#photo-group-select option:selected');
		curOption.remove();
	} else if (forCheck == 2) {
		$('.gallery-image-etap .check').parent().remove();
	}
	
	$('#modal-remove-photo-etap').modal('hide');
});
$('.button-add-name-group').click(function(){
	var name = $('#group-photo-name').val();
	var select = $('#photo-group-select');
	var slelectLength = $('#photo-group-select option').length + 1;
	var curOption = $('#photo-group-select option:selected');
	if ($('#modal-add-group-photo').hasClass('edit')) {
		curOption.text(name);
		$('#modal-add-group-photo').modal('hide');
	} else {
		buttonCreateGroupImage(name, slelectLength);
		$('#modal-add-group-photo').modal('hide');	
	}
	
});
//Выбор фото в 6 этапе
function checkFileGalleryButton() {
	$('.check-file-gallery-button').click(function(e){
		e.preventDefault();
		if ($(this).hasClass('check')) {
			$(this).children().remove();
			$(this).append('<i class="far fa-square"></i>');

		} else {
			$(this).children().remove();
			$(this).append('<i class="fas fa-check-square"></i>');
		}
		
		$(this).toggleClass('check');
		// color :#82c91e
		
	});
}
checkFileGalleryButton();

function buttonCreateGroupImage(name, countL) {
	$('#photo-group-select').append('<option value="group-' + countL + '">'+	 name +'</option>');
}

var textColumn='';
var numArr = []; //массив назначеных юнитов для добавления фото в группу
$('#select-group-photo').click(function(){
	$(this).toggleClass('active');
	if ($('#select-group-photo').hasClass('active')) {
		selectUnits();	
	} else {
		$('.item-shah').not('.item-edit-field-row, .item-edit-field-column').removeClass('hover-combine');
	}
	
});

function selectUnits(){
	var imgCheck = $('.gallery-image-etap a img').attr('href'); //Изображения из группы
	if ($('#select-group-photo').hasClass('active')) {
		
		
		$('.item-edit-field-column .create-button').unbind().click(function(e){
			e.preventDefault();
			var butThisClick = $(this);
			selectColumn(butThisClick);
		});
		$('.item-edit-field-row .create-button').unbind().click(function(e){
			e.preventDefault();
			var butThisClick = $(this);
			selectLine(butThisClick);
		});
		$('.item-shah .create-button-inner-unit').unbind().click(function(e){
			e.preventDefault();
			var butThisClick = $(this);
			selectUnitImg(butThisClick);
		});
		

	}
	currentUnitImg(); //Выделение текущих юнитов

}
//Выделение по кнопке столбца
function selectColumn(butClick) {
	if ($('#select-group-photo').hasClass('active')) {
		var listClass = butClick.parent().attr('class');
		var itemClass = listClass.match(/number-\d+/i);
		var indColumn = itemClass[0].match(/(\d+)/ig); //номер столбца для выделения
		var indi = +indColumn - 1;
		var curSelect = $('.line-img-info-flat p span').text().split().sort(compareNumeric);
		var lineShah = $('.line-shah');
		var lineShahLength = $('.line-shah').length - 1;
		var tempText;
		var text; //номер выделенного юнита 
		
		for (var i = 0; i <= lineShahLength; i++) {

			var s = lineShah.eq(i).children('.item-shah').not('.item-edit-field-row').eq(indi);
				tempText = s.children().children('.number-item').text().match(/\d+/i);
				text = parseInt(tempText[0]);
			if (s.hasClass('hover-combine')) {
				s.removeClass('hover-combine');
					numArr.forEach(function(item, i, arr) {
						if (text == item) {
							numArr.splice(i,1);
						}
					});

			} else {
				s.addClass('hover-combine');
				numArr.push(text);
			}
		}
		numArr.sort(compareNumeric);
		textColumn = numArr.join(', ');
		$('.line-img-info-flat p > span').text(textColumn);
	}
	
}
//Выделение по кнопке Этаж
function selectLine(butClick) {
	if ($('#select-group-photo').hasClass('active')) {
		var line = butClick.parent().parent().siblings().not('.item-edit-field-column, .item-floor');
		var lineShah = $('.line-shah');
		var lineShahLength = $('.line-shah').length - 1;
		var tempText;
		var text; //номер выделенного юнита 
			line.each(function(){
			var s = $(this);
			tempText = s.children().children('.number-item').text().match(/\d+/i);
			text = parseInt(tempText[0]);
			if (s.hasClass('hover-combine')) {
				s.removeClass('hover-combine');
					numArr.forEach(function(item, i, arr) {
						if (text == item) {
							numArr.splice(i,1);
						}
					});

			} else {
				s.addClass('hover-combine');
				numArr.push(text);
			}

		});
		numArr.sort(compareNumeric);
		textColumn = numArr.join(', ');
		$('.line-img-info-flat p > span').text(textColumn);
	}
}
//Выделение по кнопке Выбрать в юните
function selectUnitImg(butClick) {
	if ($('#select-group-photo').hasClass('active')) {
		var uniSel = butClick.parent().parent();
		var tempText = uniSel.children().children('.number-item').text().match(/\d+/i);
		var text  = parseInt(tempText[0]); //номер выделенного юнита 
		if (uniSel.hasClass('hover-combine')) {
				uniSel.removeClass('hover-combine');
					numArr.forEach(function(item, i, arr) {
						if (text == item) {
							numArr.splice(i,1);
						}
					});

			} else {
				uniSel.addClass('hover-combine');
				numArr.push(text);
			}

		
		numArr.sort(compareNumeric);
		textColumn = numArr.join(', ');
		$('.line-img-info-flat p > span').text(textColumn);
	}
}
//Выделение текущих юнитов из списка .line-img-info-flat
function currentUnitImg() {
	var tempText;
	var text;
	var curSelectUnits = $('.item-shah .number-item');
	numArr = $('.line-img-info-flat p span').text().split(',');
	curSelectUnits.each(function(){
		var tempText = $(this).text().match(/\d+/i);
		var text  = parseInt(tempText[0]); //номер выделенного юнита 
		var uniSel = $(this);
		numArr.forEach(function(item, i, arr) {
			if (text == parseInt(item)) {
				uniSel.parent().parent().addClass('hover-combine');
			}
		});

		
	});
}

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}

//7-й этап добавление особенностей
function shablonLineStatus() {
	var t = '<div class="line-item-status status-4"><span class="item-status"></span>'+
	'<span class="text-status">Свободна</span><span class="side-sun"><i class="fas fa-sun"></i></span></div>';
	return t
}
function shablonAdditionalLine(textParam, textAttr, opt) {
	var l = '<div class="item-line attr-item attr-item-' + opt +'">' +
						'<span>' + textParam + '</span>' +
						'<span>' + textAttr +'</span></div>';
	return l
					
}

function addLineStatus() {
	var allElem = $('.item-shah').not('.item-edit-field-row, .item-edit-field-column');
	allElem.each(function(){
		var el = $(this);
		var d = el.children().is('.line-item-status');
		if ( !d ) {
			el.children('.item-line-edit').after(shablonLineStatus());
		} 
	});

}

function addLineAttr(obj, opti) {
		
	var optText = $('#features-select option:selected').text(); //Получаем текст опции
	var shabl = shablonAdditionalLine(optText, opti, opti); //Значение из базы
	var classAtr = '.attr-item-' + opti;
	var d = obj.children().is(classAtr);
	if ( d ) {
		obj.children(classAtr).remove();
		obj.children(classAtr).after(shabl);
	} else {
		obj.children('.item-line-edit').before(shabl);
	}
	
}
var textColumnFetures='';
var numArrFeatures = []; //массив назначеных юнитов особенностей
$('#select-features-button').click(function(){
	$(this).toggleClass('active');
	selectUnitsFeatures();
	var t = $('#features-select').prop('disabled');
	if (t == true) {
		$('#features-select').prop('disabled', false)
	} else {
		$('#features-select').prop('disabled', true)
	}
	if (!$(this).hasClass('active')) {
		$('.item-shah').not('.item-edit-field-row, .item-edit-field-column').removeClass('hover-combine');
	}
});

function selectUnitsFeatures(){
	if ($('#select-features-button').hasClass('active')) {
			
		$('.item-edit-field-column .create-button').unbind().click(function(e){
			e.preventDefault();
			var butThisClick = $(this);
			selectColumnFeatures(butThisClick);
		});
		$('.item-edit-field-row .create-button').unbind().click(function(e){
			e.preventDefault();
			var butThisClick = $(this);
			selectLineFeatures(butThisClick);
		});
		$('.item-shah .create-button-inner-unit').unbind().click(function(e){
			e.preventDefault();
			var butThisClick = $(this);
			selectUnitFeatures(butThisClick);
		});
		

	}
	// currentUnitImg(); //Выделение текущих юнитов

}
//Выделение по кнопке столбца
function selectColumnFeatures(butClick) {
	if ($('#select-features-button').hasClass('active')) {
		var listClass = butClick.parent().attr('class');
		var itemClass = listClass.match(/number-\d+/i);
		var indColumn = itemClass[0].match(/(\d+)/ig); //номер столбца для выделения
		var indi = +indColumn - 1;
		var curSelect = $('.info-line-features p span').text().split();
		var lineShah = $('.line-shah');
		var lineShahLength = $('.line-shah').length - 1;
		var tempText;
		var text; //номер выделенного юнита 
		var optionSel = $('#features-select option:selected').val();
		
		for (var i = 0; i <= lineShahLength; i++) {

				var s = lineShah.eq(i).children('.item-shah').not('.item-edit-field-row').eq(indi);
				tempText = s.children().children('.number-item').text().match(/\d+/i);
				text = parseInt(tempText[0]);

			if (s.hasClass('hover-combine')) {
				s.removeClass('hover-combine');
					numArrFeatures.forEach(function(item, i, arr) {
						if (text == item) {
							numArrFeatures.splice(i,1);
						}
					});

			} else {
				s.addClass('hover-combine');
				numArrFeatures.push(text);
				
			}
			if (optionSel == 1) { //Добавление Солнца
				addSunClass(s, optionSel);
			} else {
				addLineAttr(s, optionSel);
			}
			
		}
		numArrFeatures.sort(compareNumeric);
		textColumnFetures = numArrFeatures.join(', ');
		$('.info-line-features p > span').text(textColumnFetures);
	}
	
}
function addSunClass(obj) {
	return obj.children('.line-item-status').toggleClass('sun');

}
//Выделение по кнопке Этаж
function selectLineFeatures(butClick) {
	if ($('#select-features-button').hasClass('active')) {
		var line = butClick.parent().parent().siblings().not('.item-edit-field-column, .item-floor');
		var lineShah = $('.line-shah');
		var lineShahLength = $('.line-shah').length - 1;
		var tempText;
		var text; //номер выделенного юнита 
		var optionSel = $('#features-select option:selected').val();
			line.each(function(){
			var s = $(this);
			tempText = s.children().children('.number-item').text().match(/\d+/i);
			text = parseInt(tempText[0]);
			if (s.hasClass('hover-combine')) {
				s.removeClass('hover-combine');
					numArrFeatures.forEach(function(item, i, arr) {
						if (text == item) {
							numArrFeatures.splice(i,1);
						}
					});

			} else {
				s.addClass('hover-combine');
				numArrFeatures.push(text);
			}
			if (optionSel == 1) { //Добавление Солнца
				addSunClass(s, optionSel);
			} else {
				addLineAttr(s, optionSel);
			}

		});
		numArrFeatures.sort(compareNumeric);
		textColumnFetures = numArrFeatures.join(', ');
		$('.info-line-features p > span').text(textColumnFetures);
	}
}
//Выделение по кнопке Выбрать в юните
function selectUnitFeatures(butClick) {
	if ($('#select-features-button').hasClass('active')) {
		var uniSel = butClick.parent().parent();
		var tempText = uniSel.children().children('.number-item').text().match(/\d+/i);
		var text  = parseInt(tempText[0]); //номер выделенного юнита
		var optionSel = $('#features-select option:selected').val(); 
		if (uniSel.hasClass('hover-combine')) {
				uniSel.removeClass('hover-combine');
					numArrFeatures.forEach(function(item, i, arr) {
						if (text == item) {
							numArrFeatures.splice(i,1);
						}
					});

			} else {
				uniSel.addClass('hover-combine');
				numArrFeatures.push(text);
			}
			if (optionSel == 1) { //Добавление Солнца
				addSunClass(uniSel, optionSel);
			} else {
				addLineAttr(uniSel, optionSel);
			}
		
		numArrFeatures.sort(compareNumeric);
		textColumnFetures = numArrFeatures.join(', ');
		$('.info-line-features p > span').text(textColumnFetures);
	}
}



$('#select-status-button').click(function(){
	$(this).toggleClass('active');
	if ($(this).hasClass('active')) {
		$('.item-shah .create-button-inner-unit').unbind().click(function(){
			var cl = $(this);
			statusChange(cl);
			
		});

	}
	var t = $('#status-select').prop('disabled');
	if (t == true) {
		$('#status-select').prop('disabled', false)
	} else {
		$('#status-select').prop('disabled', true)
	}
	
});

function statusChange(obj) {
	if ($('#select-status-button').hasClass('active')) {
		var statusVal = parseInt($('#status-select').val());
		var statusText = $('#status-select option:selected').text();
		var statusClass = 'status-' + statusVal;
		var classCur = obj.parent().next().attr('class').match(/status-\d+/i);
		if (classCur == null) {
			obj.parent().next().addClass(statusClass);
			obj.parent().next().children('.text-status').text(statusText);
		} else {
			obj.parent().next().removeClass(classCur[0]);
			obj.parent().next().addClass(statusClass);
			obj.parent().next().children('.text-status').text(statusText);
			console.log('yyyyyyyyyyyyyyy');
		}
	}
}

function removeLineColumnEdit() {
	$('.line-edit, .item-edit-field-row').remove();
}
//Редактор новостей кнопка редактировать

$('#button-editor-edit').click(function(){
	$('#button-editor-edit').hide(300);
	$('#button-editor-save').show(300);
	
		InlineEditor
			.create( document.getElementById( 'editor' ) , {
				 toolbar: [ 'heading', '|', 'bold', 'italic' ],
				language: 'ru'
			})
			.then( editor => myEditor)
			.catch( error => {
				console.error( error );
			})
});
//Редактор новостей кнопка Сохранить
$('#button-editor-save').click(function(){
	$('#button-editor-edit').show(300);
	$('#button-editor-save').hide(300);
	$('#editor').attr('contenteditable', false);
});


//Кнопка редактирование новости		
$('.button-blue-news-edit').click(function(){
	$('.modal-add-news').modal('show');
	$('.modal-add-news').on('shown.bs.modal', function () {
	  $('.modal-add-news h5').text('Редактировать новость');
	});

});
//Кнопка добавить  новость		
$('.button-blue-news-add').click(function(){
	$('.modal-add-news').modal('show');
	$('.modal-add-news').on('shown.bs.modal', function () {
	  $('.modal-add-news h5').text('Добавить новость');
	});
});



//scrool 
var winWidth;
var winHeight;
var navWidth;
var leftScopeControl;   // Левая область показа стрелки 70 длина стрелки листания
var rightScopeControl; //Правая область показа стрелки  100  длина стрелки + отступ
let mouseX, mouseY;


$(document).mousemove(function(e){
	winWidth = $(document).width();
	winHeight = $(document).height();
	navWidth = $('.nav').width();
	leftScopeControl = navWidth + 70; 
	rightScopeControl = winWidth - 100;
	mouseX = e.pageX;
	mouseY = e.pageY;
	displayLeftArrowScrool();
	displayRightArrowScrool();
});
function displayLeftArrowScrool() {
	if (mouseX > navWidth && mouseX < leftScopeControl) {
		$('.arrow-l').show();
	} else {
		$('.arrow-l').hide();
	}
}

function displayRightArrowScrool() {
	if (mouseX < winWidth && mouseX > rightScopeControl) {
		$('.arrow-r').show();
	} else {
		$('.arrow-r').hide();
	}
}

//Установка длины контейнера шахматки
// var widthContainer = 0; // вычисляемая переменная длины контейнера

// function containerWidth() {
// 	$('.line-shah:first-child').children().each(function(){
// 		widthContainer += $(this).outerWidth(true);
// 	});
// 	$('.wrap-floor').width(widthContainer);
// }
// containerWidth();

function visibleElementRight() {
	var countAllElem = $('.line-shah:nth-child(2)').children();
	var countAllElemLength = countAllElem.length;
	var visibleContentDiv = $('.visible-content').width();
	var rightDiff = 0;
	var pos78,
		pos78L,
		ind78;
	var indCur;
	var positionNext;
	var posNext, posNextL, posNull, posNullLeft = 0;
	countAllElem.each(function(){
		var mainThis = $(this);
		pos78 =  mainThis.offset();
		pos78L = pos78.left;
		if (pos78L == 78) {
			ind78 =  mainThis.index();
		

		}
		posNull = countAllElem.eq(0).offset();
		posNullLeft = posNull.left;
		for (var i = ind78; i <= countAllElemLength; i++ ) {
			rightDiff += countAllElem.eq(i).outerWidth(true);
			if (rightDiff > visibleContentDiv) {
				indCur = i;
				posNext = countAllElem.eq(i).offset();
				if (ind78 == 0) {
					posNextL = posNext.left - 78;
				} else {
					posNextL = posNext.left  + Math.abs(posNullLeft);
				
				}
				
			
				return false
			}

		}
		
		
	});
	scroolLeft(posNextL);

				
}
function visibleElementLeft() {
	var countAllElem = $('.line-shah:nth-child(2)').children();
	var countAllElemLength = countAllElem.length;
	var visibleContentDiv = $('.visible-content').width();
	var leftDiff = 0;
	var pos78,
		pos78L,
		ind78;
	var indCur;
	var positionNext;
	var posNext, posNextL, posNull, posNullLeft;
	countAllElem.each(function(){
		var mainThis = $(this);
		pos78 =  mainThis.offset();
		pos78L = pos78.left;
		if (pos78L == 78) {
			ind78 =  mainThis.index();
		}
		posNull = countAllElem.eq(0).offset();
		posNullLeft = posNull.left;
		if (ind78 != 0) {
			for (var i = ind78; i >= 0; i-- ) {
				leftDiff += countAllElem.eq(i).outerWidth(true);
				if (leftDiff > visibleContentDiv) {
					indCur = i;
				
					posNext = countAllElem.eq(i).offset();
				
						if (Math.abs(posNullLeft) < visibleContentDiv) {
							posNextL = 0;
						} else {
							posNextL = Math.abs(posNext.left)  - Math.abs(posNullLeft);
						}
						
						
					
					
					console.log('indCur ' + indCur);
					return false
				}

			}
		}
		
	});
	 scroolRight(posNextL);

	

			
}
$('.arrow-r').click(function(){
	visibleElementRight();
});
$('.arrow-l').click(function(){
	visibleElementLeft();
});
function scroolRight(right) {
	var containerDiffer = $('.wrap-floor');
	containerDiffer.css('transform','translateX(' + right +'px )');
}
function scroolLeft( left ) {
	var containerDiffer = $('.wrap-floor');
	containerDiffer.css('transform','translateX(-' + left +'px )');
}

// Добавление редактирование пользователя

$('.button-new-user').click(function(){
	$('#modal-add-user').modal('show');
});
$('.button-user-element').click(function(){
	var but = $(this);
	var childElem =  but.parent().parent().parent().children();
	var nameUser = childElem.find('.user-wrap .text .name').html();
	var statusUser = childElem.find('.user-status-wrap p').text();
	var roleUser = childElem.find('.status-wrap p').text();
	$('#modal-add-user').modal('show');
	$('#modal-add-user').on('shown.bs.modal', function () {
		 $('#modal-edit-userTitle').text('Редактировать пользователя'); 
		 $('#name-modal-add-user').val(nameUser);
		 selectFind('#role-select-modal', roleUser);
	});
	

});
function selectFind(id, textFind){
	var select = $( id + ' option');
	var valSelected;
	select.each(function(){
		var t = $(this).text();
		if (t == textFind) {
			valSelected = $(this).val();
			  $(id).val(valSelected);
			  
		}
	});
	
}

//Предпросмотр фотографии при добавлении Юзера
function previewFileUser() {
  var preview = document.querySelector('.user-form img');
  var file    = document.querySelector('#photo-modal-add-user').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
	preview.src = reader.result;
  }

  if (file) {
	reader.readAsDataURL(file);
  } else {
	preview.src = "";
  }
}

$("#photo-modal-add-user").change(function(){
   previewFileUser();
});

$('.accordion-users .edit-projects-user').click(function() {
	$(this).parent().next('.wrap-input-control-element').show();
});
	
$('.accordion-users .wrap-input-control-element .btn-input-control-dismis').click(function() {
	$(this).parent().hide();
});
$('.accordion-users .wrap-input-control-element .btn-input-control-save').click(function() {
	$(this).parent().hide();
});
$('.edit-role-inner-user').click(function(){

	if ($(this).parent().next().attr('disabled') == 'disabled') {
		
		$(this).parent().next().attr('disabled', false);

		
	} else {

		$(this).parent().next().attr('disabled', true);
	}

	
});

// Конец Добавления редактирование пользователя
//Переключение типов групп
$('#file-type-group').change(function(){
	var typeFile = $(this).val();
	var linkType = $('.links-wrap-etap');
	var imgType = $('.gallery-image-etap');
	var otherType = $('.other-files-wrap-etap');
	if (typeFile == 'img' ) {

		if( imgType.hasClass('hidden')) {
			
			imgType.removeClass('hidden').addClass('view');
			linkType.removeClass('view').addClass('hidden');
			otherType.removeClass('view').addClass('hidden');

		} 

	} else if ( typeFile == 'link' ) {

		if( linkType.hasClass('hidden')) {
			
			linkType.removeClass('hidden').addClass('view');
			otherType.removeClass('view').addClass('hidden');
			imgType.removeClass('view').addClass('hidden');

		} 

	} else {
		if( otherType.hasClass('hidden')) {
			
			otherType.removeClass('hidden').addClass('view');
			linkType.removeClass('view').addClass('hidden');
			imgType.removeClass('view').addClass('hidden');
		} 
	}
});

//main	
});