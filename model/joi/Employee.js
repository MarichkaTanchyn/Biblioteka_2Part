// const Joi =
//     require('joi');
//
// const errMessages = (errors) => {
//     errors.forEach(err => {
//         switch (err.code) {
//             case "string.empty":
//                 err.message = "Pole jest wymagane";
//                 break;
//             case "string.min":
//                 err.message = 'Pole powinno zawierać co najmniej ${err.local.limit} znaki';
//                 break;
//             case "string.max":
//                 err.message = 'Pole powinno zawierać co najwyżej ${err.local.limit} znaki';
//                 break;
//             case "string.email":
//                 err.message = 'Pole powinno zawierać prawidlowy adres email';
//                 break;
//             default:
//                 break;
//         }
//     });
//     return errors;
// }
// const empSchema = Joi.object({
//     _id: Joi.number()
//         .optional()
//         .allow(""),
//     Name: Joi.string()
//         .min(2)
//         .max(60)
//         .required()
//         .error(errMessages),
//     LastName: Joi.string()
//         .min(2)
//         .max(60)
//         .required()
//         .error(errMessages),
//     Email: Joi.string()
//         .email()
//         .required()
//         .error(errMessages),
// });
//
//
//
// module.exports = empSchema;
