
$(document).ready(() => {
  $(".add-new").click(() => {
    $(this).attr("disabled", "disabled");
    let index = $("table tbody tr:last-child").index();
    let row =
      "<tr>" +
        '<td><input type="text" autocomplete="off" class="form-control" name="name" id="name"></td>' +
        '<td><input type="text" autocomplete="off" class="form-control" name="department" id="department"></td>' +
        '<td><input type="text" autocomplete="off" class="form-control" name="country" id="country"></td>' +
        '<td><input type="number" autocomplete="off" class="form-control" name="phone" id="phone"></td>' +
        "<td>" +
          '<a class="add" title="Add"><i class="material-icons">&#xE03B;</i></a>' +
          '<a class="cancel" title="Cancel"><i class="material-icons">&#xe5c9;</i></a>' +
        "</td>" +
      "</tr>";
    $("table").append(row)
    $("table tbody tr")
      .eq(index + 1)
      .find(".add, .edit")
      .toggle()
  })

  // Cancel function
  $(document).on("click", ".cancel", function () {
    $(this).parents("tr").remove()
    $(".add-new").removeAttr("disabled")
  })

})

// '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'
// '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'