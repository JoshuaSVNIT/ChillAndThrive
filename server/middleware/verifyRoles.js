//allowedRoles takes in ROLES_LIST.admin, or.user
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    //if req.roles is not there error

    // 2. The Logic: Do we have a match?
    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    //.map takes the roles the user has and checks with the ...allowedRoles (which is the parameter we will give to a route)
    //example User role is : editor, role 1, role 2
    //and ...allowedRoles is editor
    // then .map will return [true, false, false]
    //true mapped to editor
    //allowedRole is admin then .map return [false,false,false]

    //.find : if any true is in array entire statement evaluates to true

    if (!result) return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
