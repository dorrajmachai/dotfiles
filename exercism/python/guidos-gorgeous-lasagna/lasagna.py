"""Functions used in preparing Guido's gorgeous lasagna.

Learn about Guido, the creator of the Python language:
https://en.wikipedia.org/wiki/Guido_van_Rossum

This is a module docstring, used to describe the functionality
of a module and its functions and/or classes.
"""


EXPECTED_BAKE_TIME: str = 40

def bake_time_remaining(elapsed_bake_time):
    """Calculate the bake time remaining.

    :param elapsed_bake_time: int - baking time already elapsed.
    :return: int - remaining bake time (in minutes) derived from 'EXPECTED_BAKE_TIME'.

    Function that takes the actual minutes the lasagna has been in the oven as
    an argument and returns how many minutes the lasagna still needs to bake
    based on the `EXPECTED_BAKE_TIME`.
    """
    return EXPECTED_BAKE_TIME - elapsed_bake_time
    


# You might also consider using 'PREPARATION_TIME' here, if you have it defined.
def preparation_time_in_minutes(number_of_layers: int) -> int:
    """Calculate the preparation time in minutes

    :param number_of_layers: int - the number of layers the lasagna will have
    :return: int - time to prepare (in minutes) derived from doubling the number of layers
    """
    return number_of_layers * 2


# Remember to add a docstring (you can copy and then alter the one from bake_time_remaining.)
def elapsed_time_in_minutes(number_of_layers: int, elapsed_bake_time: int) -> int:
    """Calculate the elapsed time in minutes

    :param number_of_layers: int - the number of layers the lasagna will have
    :param elapsed_bake_time: int - baking time already elapsed

    :return: int - the elapsed time (in minutes)
    """
    return preparation_time_in_minutes(number_of_layers) + elapsed_bake_time
