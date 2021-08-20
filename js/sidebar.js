let sidebarText;
let sb;
let mainPanel;
let socialIcons;
let sidebarRights;

let parentCollapsables;

let collapsibleSidebar;

$(document).ready(function () {
  $("#menu-collapse").click(() => {
    toggleSidebar();
  });

  initElements();
  removeUnecessaryShops();
  fixingDropdowns();

  if ($(window).width() <= 974) {
    defaultSidebar();
    mainPanel.css("width", "100%");
  } else {
    $("#menu-collapse").show();
    userDefault();
  }
});

function fixingDropdowns() {
  let dropdowns = $('[data-toggle="dropdown"]');
  
  if (dropdowns.length <= 1) {
    //If there is only the chain dropdown then it is not neccesary to do this
    return;
  }
  
  let openedDropdown = $('[data-toggle="dropdown"][aria-expanded="true"]');
  let styleText = openedDropdown.attr("style");
  
  let scrollPos = $(document).scrollTop();
  dropdowns.click();

  //Prevent popups from opening by simulating clicks
  $(".sidebar").click();
  $(document).scrollTop(scrollPos);

  if (openedDropdown.length > 0) {
    reOpenDropdown(openedDropdown, styleText);
  }
}

function reOpenDropdown(el, styleText) {
  el.attr("aria-expanded", "true");
  el.parent().addClass("show");
  el.siblings(".dropdown-menu").addClass("show").attr("style", styleText);
}

$(window).resize(function () {
  // This will execute whenever the window is resized
  if ($(window).width() <= 974) {
    defaultSidebar();
  } else {
    $("#menu-collapse").show();
    userDefault();
  }
});

function userDefault() {
  if (
    localStorage.getItem("sidebar") === "expanded" ||
    localStorage.getItem("sidebar") === null
  ) {
    collapsibleSidebar = false;
    expandSidebar();
  } else {
    collapsibleSidebar = true;
    collapseSidebar();
  }
}

function initElements() {
  sb = $(".sidebar");
  mainPanel = $(".main-panel");
  socialIcons = $(".sidebar-text.icons");
  sidebarRights = $(".sidebar-text.rights");

  sidebarText = $(".sidebar-text.rights").html();

  parentCollapsables = $("li.collapsibleParent");
}

function toggleSidebar() {
  if (collapsibleSidebar) {
    expandSidebar();
    localStorage.setItem("sidebar", "expanded");
  } else {
    collapseSidebar();
    localStorage.setItem("sidebar", "collapsed");
  }
}

function defaultSidebar() {
  expandSidebar();

  $("#menu-collapse").hide();
  mainPanel.removeAttr("style");

  removingPopopvers();
}

function expandSidebar() {
  sb.removeClass("collapsed");
  mainPanel.css("width", "calc(100% - 28rem)");
  socialIcons.show();
  sidebarRights.html(sidebarText);

  $("#menu-collapse").find("p").text("Collapse sidebar");

  parentCollapsables.each(function () {
    $(this).find("a").attr("data-toggle", "collapse");
  });

  collapsibleSidebar = false;
  removingPopopvers();
}

function collapseSidebar() {
  sb.addClass("collapsed");
  mainPanel.css("width", "calc(100% - 10rem)");
  socialIcons.hide();

  $("#menu-collapse").find("p").text("Expand sidebar");

  sidebarRights.html(
    '<span><i class="material-icons">copyright</i> Unifty</span>'
  );

  parentCollapsables.each(function () {
    $(this).find("a").removeAttr("data-toggle");
  });

  collapsibleSidebar = true;
  closeOpenDropdowns();
  addingPopopvers();
}

//Keeping DOM clean and css working
function removeUnecessaryShops() {
  let shops = $("li.nav-item.shop");

  shops.each(function () {
    if ($(this).css("display") == "none") {
      $(this).remove();
    }
  });
}

function closeOpenDropdowns() {
  $(".collapsibleParent a").each(function () {
    $(this).addClass("collapsed");
    $(this).attr("aria-expanded", "false");
  });

  $('div[data-parent="#accordion"]').each(function () {
    $(this).removeClass("show");
  });
}

function addingPopopvers() {
  let menuTags = $('.sidebar-wrapper .nav .nav-item:not(".collapsible") a');
  let $this;

  menuTags.each(function () {
    $this = $(this);

    if ($this.parent().hasClass("collapsibleParent")) {
      //To get the submenu items
      let childElements = $this.parent().parent().next().find("li.collapsible");

      let stringElements = "";
      childElements.each(function () {
        let active = "";
        if ($(this).hasClass("active")) {
          active = "active";
        }

        stringElements +=
          '<a class="nav-link ' +
          active +
          '" href="' +
          $(this).find("a").attr("href") +
          '">' +
          '<i class="material-icons">fiber_manual_record</i><p>' +
          $(this).find("p").text() +
          "</p></a>";
      });

      createSidebarPopover(
        $this,
        '<div class="sidebarPopover">' + stringElements + "</div>"
      );
    } else {
      //Some elements use JS for their click therefore this is not necessary
      if ($this.attr("href") == undefined) {
        createSidebarPopover(
          $this,
          '<div class="sidebarPopover"><a class="nav-link" ><p>' +
            $this.find("p").text() +
            "</p></a></div>"
        );
      } else {
        createSidebarPopover(
          $this,
          '<div class="sidebarPopover"><a class="nav-link" href="' +
            $this.attr("href") +
            '">' +
            "<p>" +
            $this.find("p").text() +
            "</p></a></div>"
        );
      }
    }
  });
}

function createSidebarPopover($this, data_content) {
  $this
    .attr({
      "data-container": "body",
      "data-toggle": "popover",
      "data-placement": "right",
      "data-trigger": "click",
      "data-html": "true",
      "data-content": data_content,
    })
    .popover({
      trigger: "manual",
      animation: true,
    })
    .on("mouseenter", function () {
      var _this = this;
      $(this).popover("show");
      $(".popover").on("mouseleave", function () {
        $(_this).popover("hide");
      });
    })
    .on("mouseleave", function () {
      var _this = this;
      setTimeout(function () {
        if (!$(".popover:hover").length) {
          $(_this).popover("hide");
        }
      }, 50);
    });
}

function removingPopopvers() {
  let menuTags = $('.nav .nav-item:not(".collapsible") a');
  menuTags.each(function () {
    $(this).removeAttr(
      "data-container data-placement data-trigger data-content data-original-title title"
    );

    $(this).popover("dispose").off("mouseenter").off("mouseleave");
  });
}