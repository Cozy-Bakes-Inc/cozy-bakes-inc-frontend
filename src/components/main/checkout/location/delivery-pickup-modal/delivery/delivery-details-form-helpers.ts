import type { AuthenticatedUser } from "@/interfaces";
import type {
  DeliveryLocationDetails,
  ReceiverDetails,
} from "@/store/delivery-pickup-modal-store";
import type { ShippingInformationSchemaValues } from "@/schemas/main/account";

export function normalizeShippingInformationValues(
  values: ShippingInformationSchemaValues,
): ShippingInformationSchemaValues {
  return {
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    phone_number: values.phone_number.trim(),
    apt_villa: values.apt_villa.trim(),
    building_cluster: values.building_cluster.trim(),
    street_landmark: values.street_landmark?.trim() ?? "",
    latitude: values.latitude.trim(),
    longitude: values.longitude.trim(),
  };
}

export function buildInitialShippingInformationValues(
  user?: AuthenticatedUser,
): ShippingInformationSchemaValues {
  return {
    first_name: user?.receiver?.first_name?.trim() ?? "",
    last_name: user?.receiver?.last_name?.trim() ?? "",
    phone_number: user?.receiver?.phone_number?.trim() ?? "",
    apt_villa: user?.shipping?.apt_villa?.trim() ?? "",
    building_cluster: user?.shipping?.building_cluster?.trim() ?? "",
    street_landmark: user?.shipping?.street_landmark?.trim() ?? "",
    latitude: user?.shipping?.latitude?.trim() ?? "",
    longitude: user?.shipping?.longitude?.trim() ?? "",
  };
}

export function buildCurrentShippingInformationValues({
  user,
  deliveryLocation,
  receiverDetails,
}: {
  user?: AuthenticatedUser;
  deliveryLocation: DeliveryLocationDetails;
  receiverDetails: ReceiverDetails;
}): ShippingInformationSchemaValues {
  return {
    first_name: user?.receiver?.first_name?.trim() || receiverDetails.firstName,
    last_name: user?.receiver?.last_name?.trim() || receiverDetails.lastName,
    phone_number:
      user?.receiver?.phone_number?.trim() || receiverDetails.phoneNumber,
    apt_villa: deliveryLocation.aptVilla,
    building_cluster: deliveryLocation.buildingCluster,
    street_landmark: deliveryLocation.streetLandmark,
    latitude: String(deliveryLocation.latitude),
    longitude: String(deliveryLocation.longitude),
  };
}

export function hasShippingInformationChanged({
  currentValues,
  initialValues,
}: {
  currentValues: ShippingInformationSchemaValues;
  initialValues: ShippingInformationSchemaValues;
}) {
  const normalizedCurrent = normalizeShippingInformationValues(currentValues);
  const normalizedInitial = normalizeShippingInformationValues(initialValues);

  return Object.keys(normalizedCurrent).some((key) => {
    const currentKey = key as keyof ShippingInformationSchemaValues;
    return normalizedCurrent[currentKey] !== normalizedInitial[currentKey];
  });
}
