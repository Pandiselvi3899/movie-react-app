import React from 'react';
// import {Formik} from "formik";
import {useFormik} from "formik";
import * as yup from "yup";

// const validateForm=(values)=>{
//     console.log("validateForm",values);
//     const errors={};

//     //email validation

//     if(values.email.length<5){
//         errors.email="please provide a longer email"
//     } 
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//       }


//     //password validation

//     if(values.password.length<8){
//         errors.password="please provide a longer password"
//     } 
//     else if  (values.password.length>12) {
//         errors.password="please provide a shorter password"
//     }
//     return errors;
// }

// export function BasicForm() {
//   return (
//     <div className="basic-form" >
//         <Formik initialValues={{  email: 'surya@gmail.com', password: ''}}
//         validate={validateForm}
//          onSubmit={(values)=>{
//             console.log("onSubmit",values);
//          }}
//         >
//             {(formik)=>(
//             <form
//             onSubmit={formik.handleSubmit} 
//             className="form">
//                  <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formik.values.email}
//                     placeholder="Enter your email"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     />
//                     {formik.errors.email && 
//                     formik.touched.email &&
//                     formik.errors.email}
//                  <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formik.values.password}
//                     placeholder="Enter your password"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     />
//                     {formik.errors.password && 
//                     formik.touched.password &&
//                     formik.errors.password}
//                     <button
//                     class="btn btn-primary"
//                      type="submit">
//                       Submit
//                    </button>
//             </form>
//              ) }
//         </Formik>
//     </div>

//   );
// }


//--------------------------------------
// useFormik hook








const validateForm=(values)=>{
    console.log("validateForm",values);
    const errors={};

    //email validation

    if(values.email.length<5){
        errors.email="please provide a longer email"
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }


    //password validation

    if(values.password.length<8){
        errors.password="please provide a longer password"
    } 
    else if  (values.password.length>12) {
        errors.password="please provide a shorter password"
    }
    return errors;
}

const formValidationSchema=yup.object({
    email:yup.string()
          .min(5,"Need a bigger email 😒")
          .required("why not fill this email ? 😠")
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Invalid email address 🤡"),
    password:yup.string()
           .min(8,"password should be atleast 8 characters 😏")
           .max(12,"password shouldnot exceed 12 characters 😤")
})


export function BasicForm() {
    const{handleSubmit,handleBlur,handleChange,values,errors,touched}= useFormik({
        initialValues:{ email: '', password: ''},
        // validate:validateForm,
        validationSchema:formValidationSchema,
         onSubmit:(values)=>{
            console.log("onSubmit",values);
         },
});
  return (
    <div className="basic-form" >
            <form
            onSubmit={handleSubmit} 
            className="form">
                 <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.email && 
                    touched.email &&
                    errors.email}
                 <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.password && 
                    touched.password &&
                    errors.password}
                    <button
                    class="btn btn-primary"
                     type="submit">
                      Submit
                   </button>
            </form>
    </div>

  );
}

