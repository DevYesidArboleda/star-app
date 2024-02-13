

export const useGetFeedVideos = async (catalogId: string) => {
  // eslint-disable-next-line no-undef
  const options = {
    method: 'GET',
    headers: {
    }
  }

  // eslint-disable-next-line no-undef
  const response = await fetch(`https://martiolo.xyz/api/catalogues/get-checkout-catalogue?id=${catalogId}`, options as RequestInit)
  const json = await response.json()
  console.log(json.data.products)
  const videos = json.data.products
  return videos
}
