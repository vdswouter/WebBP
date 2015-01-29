this["tpl"] = this["tpl"] || {};
this["tpl"]["header"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <a class=\"logout button small\" title=\"logout\" href=\"#\">Logout</a>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h1>Welcome <span class=\"name\"></span></h1>\n<h3>Model View Whatever</h3>\n<p class=\"info\"></p>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.loggedin : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["tpl"]["login"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<form action=\"\">\n    <input type=\"text\" name=\"login-username\" placeholder=\"Username\"/><br/>\n    <input type=\"text\" name=\"login-password\" placeholder=\"Password\"/><br/>\n    <input type=\"submit\" class=\"button js-btn-login\" value=\"Login\" />\n</form>\n";
  },"useData":true});
this["tpl"]["playlist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "        <li class=\"track\" data-tracknumber=\""
    + escapeExpression(lambda((data && data.index), depth0))
    + "\">\n            <h4>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n            <h5>"
    + escapeExpression(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"artist","hash":{},"data":data}) : helper)))
    + "</h5>\n        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n<ul class=\"playlist\">\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.playlist : depth0)) != null ? stack1.tracks : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});
this["tpl"]["playlistMenu"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<nav>\n    <button class=\"button-secondary-pill\" data-playlist=\"a\">Playlist A</button>\n    <button class=\"button-secondary-pill\" data-playlist=\"b\">Playlist B</button>\n    <button class=\"button-secondary-pill\" data-playlist=\"hottestrecord2013\">Hottest Record of 2013</button>\n</nav>\n<img src=\"img/loader.GIF\" style=\"margin: 50px auto; display: block;\" class=\"playlist-preloader is-hidden\" width=\"32\" height=\"32\" alt=\"\"/>\n";
},"useData":true});
this["tpl"]["trackDetail"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"trackdetail\">\n    <button class=\"button-close\"></button>\n    <h2>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n    <h3>"
    + escapeExpression(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"artist","hash":{},"data":data}) : helper)))
    + "</h3>\n    <p>"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</p>\n    <p>"
    + escapeExpression(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"status","hash":{},"data":data}) : helper)))
    + "</p>\n</div>";
},"useData":true});