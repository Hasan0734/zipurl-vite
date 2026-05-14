// import React from "react";

// const CustomAliasInput = () => {
//   return (
//     <form.Field
//       validators={{
//         onChangeAsyncDebounceMs: 500,
//         onChangeAsync: async ({ value, fieldApi }) => {
//           const originalUrlValid =
//             fieldApi.form.getFieldMeta("original_url")?.isValid;
//           const isValid = fieldApi.state.meta.isValid;
//           const originalUrlValue = fieldApi.form.getFieldValue("original_url");

//           if (
//             !value ||
//             value.length <= 8 ||
//             !originalUrlValid ||
//             !isValid ||
//             !originalUrlValue
//           ) {
//             return undefined;
//           }

//           try {
//             const res = await api.post("/urls/check/custom-alias", {
//               custom_alias: value,
//             });

//             if (!res.data.success) {
//               return {
//                 message: res.data.message,
//               };
//             }

//             return undefined;
//           } catch (e: any) {
//             return {
//               message: e.response.data.message[0] || "Error checking alias",
//             };
//           }
//         },
//       }}
//       name="custom_alias"
//       children={(field) => {
//         const isInvalid =
//           field.state.meta.isTouched && !field.state.meta.isValid;

//         const hasValue = field.state.value && field.state.value.length >= 8;
//         const isChecking = field.state.meta.isValidating && !isInvalid;
//         const originalUrlValid = form.getFieldMeta("original_url")?.isValid;

//         const originalUrlValue = form.getFieldValue("original_url");

//         return (
//           <Field>
//             <FieldLabel htmlFor={field.name}>
//               Custom Alias (Optional)
//             </FieldLabel>
//             <InputGroup className="h-11!">
//               <InputGroupInput
//                 aria-invalid={isInvalid}
//                 id={field.name}
//                 name={field.name}
//                 value={field.state.value}
//                 onBlur={field.handleBlur}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 placeholder={"my-link"}
//               />
//               <InputGroupAddon align="inline-start">
//                 <Pen size={18} />
//               </InputGroupAddon>
//             </InputGroup>
//             {hasValue && isChecking && (
//               <div className="flex gap-1 items-center text-center text-sm text-muted-foreground">
//                 <Spinner />
//                 <p>Checking...</p>
//               </div>
//             )}
//             {isInvalid && <FieldError errors={field.state.meta.errors} />}
//             {!isChecking &&
//               !isInvalid &&
//               hasValue &&
//               originalUrlValue &&
//               originalUrlValid && (
//                 <div className="flex gap-1 text-primary items-center text-sm">
//                   <CheckIcon size={16} />
//                   <span>Alias is availble!</span>
//                 </div>
//               )}
//           </Field>
//         );
//       }}
//     />
//   );
// };

// export default CustomAliasInput;
