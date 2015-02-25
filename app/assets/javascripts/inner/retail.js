function priceSumArr(id, keyDown){
    tmpArr = new Array();
    newArr = new Array();
    goods[id] = 1;

    var i = 0;
    for (var key in goods) {

        sum = $("#p-"+key).text();

        price = $("#"+key).prop("value");
        tmp_price = price;

        if(id == key && keyDown == true){
            price = price + number;
        }

        if(eval(price) > 0 && price.length != 0){

            $("#t-"+key).css("background", "#eeccaa");
            newArr[i] = eval(sum)*eval(price);
            tmpArr[key] = 1;
        }
        else $("#t-"+key).css("background", "#FFFBF2");
        i++;
    }

    goods = new Array();
    goods = tmpArr;
    $("#curentPrice").empty().text((array_sum(newArr))?array_sum(newArr):"0.00");
    $("#curentPriceb").empty().text((array_sum(newArr))?array_sum(newArr):"0.00");
    $("#i-sum").attr("value",(array_sum(newArr))?array_sum(newArr):"0.00");
}

function array_sum( array ) {
    var key, sum=0;
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ) return null;
    for(var key in array) sum += array[key];
    return sum.toFixed(2);
}

$(function () {
    $('.tabs-holder').addClass( "ui-tabs-vertical ui-helper-clearfix" );

    goods = new Array();
    number = '';

    $(".cnt_prt > input").change( function() {
        var idThisDiv = $(this).parents('div').attr("id");
        var id = idThisDiv.replace(/b-/gi, "");

        var shag = $("#c-"+id).text();
        if (shag) {shag = shag.replace(/\/.+/gi, "")}
        var price = $("#"+id).prop("value");
        var krat = eval(price) % eval(shag);
        if(eval( krat ) > 0) var finalSum = eval( shag ) - eval( krat ) + eval( price );
        else var finalSum =  eval(price);
        $("#"+idThisDiv+" > input").prop("value", finalSum);   //attr method was replaced with prop one
        priceSumArr(id);

    });

    $(".cnt_prt > input").keydown(function(event){
        var art = parseInt($(this).attr('class'));
        if(art >= 26687001 && art <= 26687100)
        {}
        else
        {
            switch (event.keyCode){
                case 48: number = 0;break;
                case 49: number = 1;break;
                case 50: number = 2;break;
                case 51: number = 3;break;
                case 52: number = 4;break;
                case 53: number = 5;break;
                case 54: number = 6;break;
                case 55: number = 7;break;
                case 56: number = 8;break;
                case 57: number = 9;break;
                default: number = "";
            }

            if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8 ||
                event.keyCode == 27 || event.keyCode == 46 || event.keyCode == 116 || event.keyCode == 190) {

                var idThisDiv = $(this).parents('div').attr("id");
                var id = idThisDiv.replace(/b-/gi, "");

                priceSumArr(id, true);
                return true;
            }
            else if(event.keyCode == 13) return false;
            return false;
        }
    });

    $('.plus').click(function(){
        var idThisDiv  = $(this).parents('div').attr("id");
        var valueInput = $("#"+idThisDiv+" > input").prop("value");
        var id = idThisDiv.replace(/b-/gi, "");
        var price = eval($("#p-"+id).text());
        var shag = $("#c-"+id).text();
        if (shag) {shag = shag.replace(/\/.+/gi, "")}

        if(valueInput == "" || valueInput == 0){
            $("#"+idThisDiv+" > input").prop("value", shag);
        }
        else if (valueInput > 0){
            var finalSum =  eval(shag) + eval(valueInput);
            finalSum = Math.round(finalSum*100)/100;
            $("#"+idThisDiv+" > input").prop("value", finalSum);
        }

        priceSumArr(id);

        return true;
    });

    $('.minus').click(function(){
        var idThisDiv  = $(this).parents('div').attr("id");
        var valueInput = $("#"+idThisDiv+" > input").prop("value");

        var id = idThisDiv.replace(/b-/gi, "");
        var shag = $("#c-"+id).text();
        if (shag) {shag = shag.replace(/\/.+/gi, "")}

        if(valueInput == "" || valueInput <= eval(shag)){
            $("#"+idThisDiv+" > input").prop("value", "");
        }
        else if(valueInput > eval(shag)){
            var finalSum =  eval(valueInput) - eval(shag);
            finalSum = Math.round(finalSum*100)/100;
            $("#"+idThisDiv+" > input").prop("value", finalSum);
        }

        priceSumArr(id);

        return true;
    });

    $(".form-submit").click(function(){
        if (window.confirm ( "Вы все заполнили и хотите оформить заказ?" )){
            if (goods.length > 0) $(this.form).submit();
            else alert("Пустой заказ офирмить не возможно!!!");
        }
    });
});