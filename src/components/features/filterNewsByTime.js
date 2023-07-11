export const sortObjectsByPublicationTime = (objects) => {
    objects.sort(function(a, b) {
      var timeA = a.publicationTime;
      var timeB = b.publicationTime;
      if (timeA > timeB) {
        return -1;
      }
      if (timeA < timeB) {
        return 1;
      }
      return 0;
    });
    return objects;
  }

export const filterNewsByTime = (news, currentDate) => {
    const formattedNews = news.filter(i => {
        const splittedDate = i.publicationTime.split(',')

        if (splittedDate.length > 1) {
            if (splittedDate[0] === currentDate) {
                i.publicationTime = splittedDate[1].trim()
                return i
            }
        } else {
            return i
        }

        

    })

    const result = sortObjectsByPublicationTime(formattedNews)
    return result
} 
