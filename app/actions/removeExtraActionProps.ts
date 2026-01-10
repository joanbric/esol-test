export const removeExtraActionProps = (formData: FormData) => {
  return Object.fromEntries(Array.from(formData.entries()).filter(([key]) => !key.startsWith('$ACTION_')))
}
