function verifyToken(req) {
  const { user } = req.session;
}

export class HomeController {
  static async home(req, res) {
    const { user } = req.session;
    if (user) {
      return res.redirect("/user/dashboard");
    }
    res.render("home", {
      layout: "main",
      title: "Inicio",
    });
  }
  static async register(req, res) {
    const { user } = req.session;
    if (user) {
      return res.redirect("/user/dashboard");
    }
    res.render("register", {
      layout: "main",
      title: "Registrarse",
    });
  }
  static async login(req, res) {
    const { user } = req.session;
    if (user) {
      return res.redirect("/user/dashboard");
    }
    res.render("login", {
      layout: "main",
      title: "Ingresar",
    });
  }
  static async about(req, res) {
    res.render("about", {
      layout: "main",
      title: "About",
    });
  }
  static async e404(req, res) {
    res.render("not_found", {
      layout: "main",
      title: "404 - Pafe Not Found",
    });
  }
}
