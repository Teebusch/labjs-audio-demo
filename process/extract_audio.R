if (!require("renv")) install.packages("renv")
renv::restore()


library(readr)
library(stringr)
library(dplyr)
library(magrittr)
library(purrr)
library(glue)
library(base64enc)



extract_audio <- function(f) {
  df <- readr::read_csv(f)

  df %>%
    filter(!is.na(audio)) %>%
    mutate(
      audio =
        str_remove(audio, "data:audio/ogg; codecs=opus;base64,")
    ) %$%
    walk2(sender_id, audio, function(id, audio) {
      base64_to_file(audio, glue::glue("trial_{ id }.ogg"))
    })
}



# base64 to file
base64_to_file <- function(x, filename) {
  f <- file(filename, "wb")
  base64decode(x, output = f)
  close(f)
}


extract_audio("example-data.csv")
