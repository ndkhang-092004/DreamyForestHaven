import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ currentCabin = {}, onCloseModal }) {
  const { id: cabinUpdateId, ...updateValues } = currentCabin;
  const isEditSession = Boolean(cabinUpdateId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? updateValues : {},
  });
  const { errors } = formState;
  const { createCabin, isCreatingCabin } = useCreateCabin();

  const { updateCabin, isUpdatingCabin } = useUpdateCabin();

  const isLoading = isCreatingCabin || isUpdatingCabin;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      updateCabin(
        { newCabinData: { ...data, image }, id: cabinUpdateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isLoading}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"maxCapacity"} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity has to be at least 1!",
            },
          })}
        />
      </FormRow>

      <FormRow label={"regularPrice"} error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price has to be at least 1!",
            },
          })}
        />
      </FormRow>

      <FormRow label={"discount"} error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label={"description"} error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isLoading}
          defaultValue=''
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>
          {isEditSession ? "Save changes" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
