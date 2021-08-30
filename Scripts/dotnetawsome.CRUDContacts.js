
var $dialog;

$(document).ready(function () {


    //Open popup
    $('body').on("click", "a.popup", function (e) {
        e.preventDefault();
        var page = $(this).attr('href');
        OpenPopup(page);
    });

    $('body').on('change', '#CountryID', function () {
        var countryID = $(this).val();
        LoadStates(countryID);
    });

    //Save Contacts
    $("body").on('submit', '#saveForm', function (e) {
        var target_id = $('#target_id').val();
        e.preventDefault();
        SaveContacts(target_id);
    });

    //Delete Contact
    $('body').on('submit', '#deleteForm', function (e) {
        e.preventDefault();
        DeleteContact();
    });
});

function LoadContacts(target_id, contact) {
    $("#" + target_id).val(contact.EmployeeNm);
}

//open popup
function OpenPopup(Page) {
    var $pageContent = $('<div/>');
    $pageContent.load(Page);
    $dialog = $('<div class="popupWindow" style="overflow:hidden"></div>')
            .html($pageContent)
            .dialog({
                draggable: true,
                autoOpen: true,
                resizable: true,
                model: true,
                width: 400,
                height: 500,
                close: function () {
                    $dialog.dialog('destroy').remove();
                }
            })
    $dialog.dialog('open');
}

//Casecade dropdown - Populate states of selected country
function LoadStates(countryID) {
    var $state = $('#StateID');
    $state.empty();
    $state.append($('<option></option>').val('').html('Please Wait...'));
    if (countryID == null || countryID == "") {
        $state.empty();
        $state.append($('<option></option>').val('').html('Select State'));
        return;
    }

    $.ajax({
        url: '/home/GetStateList',
        type: 'GET',
        data: { 'countryID': countryID },
        dataType: 'json',
        success: function (d) {
            $state.empty();
            $state.append($('<option></option>').val('').html('Select State'));
            $.each(d, function (i, val) {
                $state.append($('<option></option>').val(val.StateID).html(val.StateName));
            });
        },
        error: function () {

        }
    });

}


//Save Contact
function SaveContacts(target_id) {

    //Validation
    if ($('#EmployeeCd').val().trim() == '' ||
        $('#EmployeeNm').val().trim() == '') {
        $('#msg').html('<div class="failed">未入力の項目があります</div>');
        return false;
    }

    var contact = {
        EmployeeCd: $('#EmployeeCd').val().trim(),
        EmployeeNm: $('#EmployeeNm').val().trim(),
    };

    //Add validation token
    contact.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    //Save Contact
    $.ajax({
        url: '/home/Save',
        type: 'POST',
        data: contact,
        dataType: 'json',
        success: function (data) {
            //alert(data.message);
            if (data.status) {
                LoadContacts(target_id,contact);
                $('#EmployeeCd').val('');
                $('#EmployeeNm').val('');
                $dialog.dialog('close');
            }
        },
        error: function () {
            $('#msg').html('<div class="failed">エラーが発生しました.再実行してください</div>');
        }
    });
}


//Delete Contact
function DeleteContact() {
    $.ajax({
        url: '/home/delete',
        type: 'POST',
        dataType: 'json',
        data: {
            'id': $('#ContactID').val(),
            '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').val()
        },
        success: function (data) {
            alert(data.message);
            if (data.status) {
                $dialog.dialog('close');
                LoadContacts();
            }
        },
        error: function () {
            $('#msg').html('<div class="failed">Error ! Please try again.</div>');
        }
    });
}








