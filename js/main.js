var datamodel = {
  Provinces: [
    {
      kProvinceID: 0,
      AbbrevName: "NS",
      Name: "Nova Scotai",
    },
    {
      kProvinceID: 1,
      AbbrevName: "AB",
      Name: "Alberta",
    },
    {
      kProvinceID: 2,
      AbbrevName: "BC",
      Name: "British Columbia",
    },
  ],

  Cities: [
    {
      kCityID: 0,
      fkProvinceID: 0,
      Name: "Halifax",
      Description:
        "Halifax is a major economic centre in eastern Canada with a large concentration of government services and private sector companies.",
    },
    {
      kCityID: 1,
      fkProvinceID: 0,
      Name: "Syndey",
      Description:
        "Sydney is a Canadian community in Nova Scotia. Situated on Cape Breton Island's east coast, it belongs administratively to the Cape Breton Regional Municipality. Sydney was founded in 1785 by the British Crown.",
    },
    {
      kCityID: 2,
      fkProvinceID: 1,
      Name: "Calgary",
      Description:
        "As of the 2011 census, the City of Calgary had a population of 1,096,833[3] and a metropolitan population of 1,214,839, making it the largest city in Alberta.",
    },
    {
      kCityID: 3,
      fkProvinceID: 1,
      Name: "Lethbridge",
      Description:
        "Lethbridge is the commercial, financial, transportation and industrial centre of southern Alberta. The city's economy developed from drift mining for coal in the late 19th century and agriculture in the early 20th century.",
    },
    {
      kCityID: 4,
      fkProvinceID: 2,
      Name: "Vancouver",
      Description:
        "Vancouver is a coastal seaport city on the mainland of British Columbia, Canada. The 2011 census recorded more than 603,000 people in the city, making it the eighth largest Canadian city.",
    },
    {
      kCityID: 5,
      fkProvinceID: 2,
      Name: "Victoria",
      Description:
        "Victoria is about 100 kilometres (62 miles) from BC's largest city of Vancouver on the mainland. The city is about 100 kilometres (62 miles) from Seattle by airplane, ferry, or the Victoria Clipper passenger-only ferry.",
    },
    {
      kCityID: 6,
      fkProvinceID: 1,
      Name: "",
      Description: "",
    },
  ],
};

/* Depended dropdown list */
$(document).ready(function () {
  $("#summaryDiv").hide();
  load_json_data("Province");

  function load_json_data(id, parent_id) {
    var html_code = "";

    html_code += '<option value="-1">Select Province</option>';
    $.each(datamodel.Provinces, function (key, value) {
      if (id == "Province") {
        html_code +=
          '<option value="' +
          value.kProvinceID +
          '">' +
          value.Name +
          "</option>";
      }
    });
    $("#" + id).html(html_code);
  }

  $(document).on("change", "#Province", function () {
    var cityId = "City";
    var province_id = $(this).val();
    if (province_id != "") {
      var html_code = "";

      html_code += '<option value="-1">Select City</option>';
      $.each(datamodel.Cities, function (key, value) {
        if (value.fkProvinceID == province_id) {
          html_code +=
            '<option value="' + value.kCityID + '">' + value.Name + "</option>";
        }
      });
      $("#" + cityId).html(html_code);
      $("#description").html(" ");
    }
  });
  $(document).on("change", "#City", function () {
    var city_id = $(this).val();
    if (city_id != "") {
      const city = datamodel.Cities.find(
        (x) => x.kCityID === Number(city_id)
      ) || { Description: "Description" };
      var tag = document.createElement("p");
      var text = document.createTextNode(city.Description);
      tag.appendChild(text);
      var element = document.getElementById("description");
      element.appendChild(tag);
    } else {
      $("#City").html('<option value="">Select City</option>');
    }
  });
  $("#submitBtn").click(function () {
    $("#myForm").submit((e) => {
      e.preventDefault();
      var txtName = $("#txtName").val();
      var txtOccupation = $("#txtOccupation").val();
      var txtAddress1 = $("#txtAddress1").val();
      var txtAddress2 = $("#txtAddress2").val();
      var Province = (
        datamodel.Provinces.find(
          (x) => x.kProvinceID === Number($("#Province").val())
        ) || {}
      ).Name;
      console.log(Province);
      var city = (
        datamodel.Cities.find((x) => x.kCityID === Number($("#City").val())) ||
        {}
      ).Name;
      if (txtName && txtOccupation && txtAddress1 && Province && city) {
        $("#myForm").hide();
        document.getElementById("_txtName").innerHTML = txtName;
        document.getElementById("_txtOccupation").innerHTML = txtOccupation;
        document.getElementById("_txtAddress1").innerHTML = txtAddress1;
        document.getElementById("_txtAddress2").innerHTML = txtAddress2;
        document.getElementById("_Province").innerHTML = Province;
        document.getElementById("_city").innerHTML = city;
        $("#summaryDiv").show();
      }
    }); // Submit the form
  });
  $("#editBtn").click(function () {
    $("#myForm").show();
    $("#summaryDiv").hide();
  });
});

/* Form validator */
var forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
});
